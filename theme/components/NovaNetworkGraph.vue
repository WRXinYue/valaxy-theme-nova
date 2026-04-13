<script setup lang="ts">
import type { D3DragEvent, D3ZoomEvent, Selection, Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3'
import type { Post } from 'valaxy'
import * as d3 from 'd3'
import { isLocaleKey, stripLocalePrefix, tObject, usePageList } from 'valaxy'
import novaLinkCache from 'virtual:nova-link-cache'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useThemeConfig } from '../composables'
import { normalizeRoute } from '../node/link-route'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  nodeWeight?: number
  scale?: number
  hideScaleThreshold?: number
  selectNodeColor?: string
}>(), {
  nodeWeight: 5,
  scale: 1.2,
  hideScaleThreshold: 1,
  selectNodeColor: 'var(--va-c-primary)',
})

const chartContainer = ref<HTMLElement | null>(null)
const themeConfig = useThemeConfig()
const { t, locale } = useI18n()

function resolveTitle(raw: Post['title'] | undefined): string {
  let resolved = tObject(raw ?? '', locale.value)
  if (typeof resolved === 'string' && isLocaleKey(resolved))
    resolved = t(stripLocalePrefix(resolved))
  return typeof resolved === 'string' ? resolved : String(resolved)
}

const graphOpts = computed(() => {
  const g = themeConfig.value.networkGraph
  if (typeof g === 'object' && g) {
    return {
      width: g.width ?? 260,
      height: g.height ?? 220,
    }
  }
  return { width: 260, height: 220 }
})

const router = useRouter()
const route = useRoute()
const allPages = usePageList()
const posts = computed(() => {
  const pages = props.posts || allPages.value
  const t = props.type
  if (!t)
    return pages
  return pages.filter(p => p.type === t)
})

function shouldIncludeMarkdownLinks() {
  const g = themeConfig.value.networkGraph
  if (typeof g === 'object' && g && g.includeMarkdownLinks === false)
    return false
  return true
}

function pathMatches(routePath: string, nodePath: string | undefined) {
  if (!nodePath)
    return false
  return normalizeRoute(nodePath) === normalizeRoute(routePath)
}

/** Default node fill: lighter than #5c5c5c; hover → primary; current route → select color */
function nodeFill(d: any, hoveredId: string | null) {
  if (hoveredId && d.id === hoveredId)
    return 'var(--va-c-primary)'
  if (pathMatches(route.path, d.path))
    return props.selectNodeColor
  return 'var(--nova-network-graph-node-fill)'
}

let simulation: Simulation<SimulationNodeDatum, SimulationLinkDatum<SimulationNodeDatum>> | undefined
let allNodes: Array<SimulationNodeDatum | any> = []
let svg: Selection<SVGSVGElement, unknown, null, undefined> | undefined
let zoom: d3.ZoomBehavior<SVGSVGElement, unknown> | undefined

function createChart() {
  const el = chartContainer.value
  if (!el)
    return

  simulation?.stop()
  el.innerHTML = ''

  const width = graphOpts.value.width
  const height = graphOpts.value.height

  if (!posts.value.length)
    return

  const mdRefLinks: SimulationLinkDatum<SimulationNodeDatum | any>[] = shouldIncludeMarkdownLinks()
    ? novaLinkCache.links.map(l => ({
        source: l.from,
        target: l.to,
        value: 1,
      }))
    : []

  // Path-based parent links: each page links to its closest ancestor page in the list.
  // e.g. /guide/getting-started/installation → /guide/getting-started (if exists) → /guide
  const normalizedToRawPath = new Map<string, string>()
  for (const p of posts.value)
    normalizedToRawPath.set(normalizeRoute(p.path || ''), p.path || '')

  const parentSeen = new Set<string>()
  const parentLinks: any[] = []
  for (const page of posts.value) {
    const pagePath = normalizeRoute(page.path || '')
    const segments = pagePath.split('/').filter(Boolean)
    for (let d = segments.length - 1; d > 0; d--) {
      const ancestor = `/${segments.slice(0, d).join('/')}`
      const rawAncestor = normalizedToRawPath.get(ancestor)
      if (rawAncestor !== undefined) {
        const key = `${page.path}→${rawAncestor}`
        if (!parentSeen.has(key)) {
          parentSeen.add(key)
          parentLinks.push({ source: page.path, target: rawAncestor, value: 1 })
        }
        break
      }
    }
  }

  const links = [...mdRefLinks, ...parentLinks]

  const nodes = posts.value.map<SimulationNodeDatum | any>(d => ({
    id: d.path,
    group: 'page',
    title: resolveTitle(d.title),
    path: d.path,
  }))

  const pagePaths = new Set(posts.value.map(p => normalizeRoute(p.path || '')))
  const orphanIds = new Set<string>()
  if (shouldIncludeMarkdownLinks()) {
    for (const { from, to } of novaLinkCache.links) {
      if (!pagePaths.has(from))
        orphanIds.add(from)
      if (!pagePaths.has(to))
        orphanIds.add(to)
    }
  }

  const orphanNodes = [...orphanIds].map(p => ({
    id: p,
    group: 'ref',
    title: p === '/' ? '/' : (p.split('/').filter(Boolean).pop() || p),
    path: p,
  }))

  allNodes = [...nodes, ...orphanNodes]

  simulation = d3.forceSimulation(allNodes)
    .force('link', d3.forceLink(links).id((d: any) => d.id))
    .force('charge', d3.forceManyBody().strength(-50))
    .force('collide', d3.forceCollide().radius((d: any) => d.weight ? d.weight * 2.5 : 15).iterations(2))
    .force('x', d3.forceX())
    .force('y', d3.forceY())

  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg = d3.select(svgEl)
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'nova-network-graph__svg')
    .attr('style', 'max-width: 100%; height: auto; display: block;') as Selection<SVGSVGElement, unknown, null, undefined>

  zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.1, 10000])
    .on('zoom', zoomed)

  svg.call(zoom)

  const container = svg.append('g')

  const link = container.append('g')
    .attr('stroke', 'var(--nova-c-text-muted)')
    .attr('stroke-opacity', 0.55)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', (d: any) => Math.sqrt(d.value))

  const hoverRadiusScale = 1.28
  const hoverAnimMs = 140

  function baseRadius(d: any) {
    return d.weight || props.nodeWeight
  }

  const node = container.append('g')
    .attr('stroke', 'var(--nova-c-bg)')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(allNodes)
    .join('circle')
    .attr('r', (d: any) => baseRadius(d))
    .attr('fill', (d: any) => nodeFill(d, null))
    .style('cursor', 'pointer')
    .on('click', (_event, d: any) => {
      if (d.path)
        router.push(d.path)
    })
    .on('mouseover', (event, d: any) => {
      link.attr('stroke', (l: any) =>
        l.source.id === d.id || l.target.id === d.id ? 'var(--va-c-primary)' : 'var(--nova-c-text-muted)')
      node.attr('fill', (d2: any) => nodeFill(d2, d.id))
      const el = d3.select(event.currentTarget as SVGCircleElement)
      el.interrupt()
      el
        .transition()
        .duration(hoverAnimMs)
        .ease(d3.easeCubicOut)
        .attr('r', baseRadius(d) * hoverRadiusScale)
    })
    .on('mouseout', (event) => {
      link.attr('stroke', 'var(--nova-c-text-muted)')
      node.attr('fill', (d2: any) => nodeFill(d2, null))
      const datum = d3.select(event.currentTarget as SVGCircleElement).datum() as any
      const el = d3.select(event.currentTarget as SVGCircleElement)
      el.interrupt()
      el
        .transition()
        .duration(hoverAnimMs)
        .ease(d3.easeCubicOut)
        .attr('r', baseRadius(datum))
    })

  const labels = container.append('g')
    .selectAll('text')
    .data(allNodes)
    .join('text')
    .attr('text-anchor', 'middle')
    .text((d: any) => d.title)
    .style('font-size', '9px')
    .style('fill', 'var(--nova-c-text-muted)')
    .classed('nova-network-graph__label', true)

  node.append('title')
    .text((d: any) => d.title)

  node.call(d3.drag<SVGCircleElement, any>()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended) as any)

  simulation.on('tick', () => {
    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)

    node
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)

    labels
      .attr('x', (d: any) => d.x)
      .attr('y', (d: any) => d.y + (d.weight ? d.weight + 7 : 12))
  })

  function dragstarted(event: D3DragEvent<any, any, any>) {
    if (!event.active && simulation)
      simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(event: D3DragEvent<any, any, any>) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event: D3DragEvent<any, any, any>) {
    if (!event.active && simulation)
      simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }

  function zoomed(event: D3ZoomEvent<SVGSVGElement, unknown>) {
    container.attr('transform', event.transform.toString())
    const scale = event.transform.k
    if (scale < props.hideScaleThreshold)
      labels.style('display', 'none')
    else
      labels.style('display', 'block')
  }

  const initialScale = props.scale
  const initialTranslate: [number, number] = [width / 2, height / 2]

  svg.call(
    zoom.transform,
    d3.zoomIdentity.translate(...initialTranslate).scale(initialScale),
  )

  el.appendChild(svg.node()!)
}

function onRouteChange() {
  if (!svg?.node() || !allNodes.length)
    return

  svg.selectAll('circle').attr('fill', (d: any) => nodeFill(d, null))

  const targetNode = allNodes.find(node => pathMatches(route.path, (node as any).path))

  if (targetNode && (targetNode as any).x != null && zoom) {
    const { x, y } = targetNode as any
    const width = graphOpts.value.width
    const height = graphOpts.value.height
    const currentTransform = d3.zoomTransform(svg.node()!)
    const scale = currentTransform.k
    const translateX = (width / 2 - x * scale)
    const translateY = (height / 2 - y * scale)

    svg.transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(translateX, translateY).scale(scale),
      )
  }
}

onMounted(async () => {
  await nextTick()
  createChart()
  setTimeout(onRouteChange, 800)
})

watch(
  [posts, graphOpts, locale],
  () => {
    nextTick(() => {
      createChart()
      setTimeout(onRouteChange, 400)
    })
  },
  { deep: true },
)

watch(() => route.path, () => {
  nextTick(() => onRouteChange())
})

onBeforeUnmount(() => {
  simulation?.stop()
})
</script>

<template>
  <div class="nova-network-graph">
    <h2 class="nova-network-graph__title">
      {{ t('nova.networkGraph.title') }}
    </h2>
    <div ref="chartContainer" class="nova-network-graph__chart" />
  </div>
</template>

<style lang="scss" scoped>
.nova-network-graph {
  --nova-network-graph-node-fill: #b8b8b8;

  padding-bottom: 1rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid var(--nova-c-border-line);

  &__title {
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--nova-c-text-deep);
    margin: 0 0 0.5rem;
    padding-left: 16px;
  }

  &__chart {
    min-height: 120px;
    overflow: hidden;
    padding-left: 16px;
  }

  :deep(.nova-network-graph__svg) {
    color-scheme: light dark;
  }
}

:deep(.nova-network-graph__label) {
  pointer-events: none;
}
</style>
