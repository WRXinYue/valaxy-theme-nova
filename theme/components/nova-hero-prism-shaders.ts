export const PRISM_VERTEX_SHADER = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

export const PRISM_FRAGMENT_SHADER = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

#define PI 3.14159265359
#define TAU 6.28318530718
#define MAX_STEPS 80
#define MAX_DIST 50.0
#define SURF_DIST 0.001

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

float sdOctahedron(vec3 p, float s) {
  p = abs(p);
  float m = p.x + p.y + p.z - s;
  vec3 q;
  if (3.0 * p.x < m) q = p.xyz;
  else if (3.0 * p.y < m) q = p.yzx;
  else if (3.0 * p.z < m) q = p.zxy;
  else return m * 0.57735027;

  float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
  return length(vec3(q.x, q.y - s + k, q.z - k));
}

float sdTriPrism(vec3 p, vec2 h) {
  vec3 q = abs(p);
  return max(q.z - h.y, max(q.x * 0.866025 + p.y * 0.5, -p.y) - h.x * 0.5);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float smax(float a, float b, float k) {
  return -smin(-a, -b, k);
}

float map(vec3 p) {
  vec3 op = p;

  vec2 m = (uMouse - 0.5) * 2.5;
  p.xy += m * 0.4;

  p.xz *= rot(uTime * 0.12);
  p.xy *= rot(uTime * 0.08);

  float d = 100.0;

  vec3 p1 = p;
  p1.yz *= rot(uTime * 0.15);

  float core_distort = sin(p1.x * 3.0 + uTime) * sin(p1.y * 3.0 + uTime) * sin(p1.z * 3.0 + uTime) * 0.1;
  float core = sdOctahedron(p1, 1.6) + core_distort;

  vec3 p2 = p1;
  p2.xy *= rot(PI * 0.25 + uTime * 0.2);
  float prism = sdTriPrism(p2, vec2(1.4, 2.0));
  core = smax(core, -prism, 0.2);

  d = core;

  float k_blend = 0.2 + 0.15 * (0.5 + 0.5 * sin(uTime * 1.5));

  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float angle = fi * TAU / 4.0 + uTime * 0.3;

    float radius = 3.0 + 0.3 * sin(uTime * 0.4 + fi);

    vec3 pos = vec3(
      cos(angle) * radius,
      sin(angle * 0.7) * 1.0,
      sin(angle) * radius
    );

    vec3 po = p - pos;
    po.xy *= rot(uTime * 0.5 + fi);

    float sat_distort = sin(po.x * 5.0 + fi) * sin(po.y * 5.0 + fi) * sin(po.z * 5.0 + fi) * 0.05;
    float satellite = sdOctahedron(po, 0.4) + sat_distort;

    d = smin(d, satellite, k_blend);
  }

  return d;
}

vec3 getNormal(vec3 p) {
  vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

float raymarch(vec3 ro, vec3 rd) {
  float t = 0.0;
  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    if (abs(d) < SURF_DIST || t > MAX_DIST) break;
    t += d * 0.7;
  }
  return t;
}

vec3 getBackground(vec3 rd) {
  float stars = 0.0;
  vec3 p = rd * 100.0;
  float h = hash(dot(p, vec3(12.9898, 78.233, 54.53)));
  if (h > 0.98) stars = pow(h - 0.98, 10.0) * 20.0;
  vec3 nebula = vec3(0.0);
  nebula += vec3(0.3, 0.15, 0.5) * pow(max(0.0, sin(rd.x * 2.0 + uTime * 0.1)), 3.0) * 0.2;
  nebula += vec3(0.15, 0.3, 0.6) * pow(max(0.0, sin(rd.y * 2.5 + uTime * 0.05)), 3.0) * 0.2;

  return stars + nebula;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

  vec2 m = (uMouse - 0.5) * 0.5;
  vec3 ro = vec3(m.x * 2.0, m.y * 2.0, 5.5);
  vec3 rd = normalize(vec3(uv, -1.0));

  rd.xy *= rot(m.x * 0.2);
  rd.yz *= rot(m.y * 0.2);

  float t = raymarch(ro, rd);

  vec3 color = vec3(0.0);

  if (t < MAX_DIST) {
    vec3 p = ro + rd * t;
    vec3 normal = getNormal(p);

    vec3 viewDir = normalize(ro - p);

    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

    float ior = 1.5;
    vec3 refractDir = refract(rd, normal, 1.0 / ior);

    if (length(refractDir) > 0.0) {
      float t2 = raymarch(p - normal * 0.01, refractDir);

      if (t2 < MAX_DIST) {
        vec3 p2 = p - normal * 0.01 + refractDir * t2;
        vec3 normal2 = getNormal(p2);

        vec3 r = refract(refractDir, -normal2, ior - 0.2);
        vec3 g = refract(refractDir, -normal2, ior);
        vec3 b = refract(refractDir, -normal2, ior + 0.2);

        vec3 bgR = getBackground(r) * vec3(1.4, 0.7, 0.7);
        vec3 bgG = getBackground(g) * vec3(0.7, 1.4, 0.8);
        vec3 bgB = getBackground(b) * vec3(0.7, 0.8, 1.4);

        color = vec3(bgR.x, bgG.y, bgB.z);
        color = pow(color, vec3(0.7)) * 5.0;
      } else {
        color = getBackground(refractDir) * 2.0;
      }
    }

    vec3 lightDir = normalize(vec3(1.0, 1.0, -1.0));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 150.0);
    color += spec * vec3(1.0, 1.0, 1.0) * 3.5;

    vec3 fresnelColor = vec3(
      0.5 + 0.5 * sin(fresnel * TAU + uTime),
      0.5 + 0.5 * sin(fresnel * TAU + uTime + TAU / 3.0),
      0.5 + 0.5 * sin(fresnel * TAU + uTime + TAU * 2.0 / 3.0)
    );
    color += fresnel * fresnelColor * 1.2;

    float edge = pow(1.0 - abs(dot(viewDir, normal)), 4.0);
    color += edge * vec3(0.6, 0.7, 1.0) * 0.7;

    float sss = pow(max(dot(-normal, lightDir), 0.0), 2.0);
    color += sss * vec3(1.0, 0.6, 0.8) * 0.5;
  } else {
    color = getBackground(rd);
  }

  float vignette = 1.0 - length(uv) * 0.4;
  vignette = smoothstep(0.3, 1.0, vignette);
  color *= vignette;

  color *= vec3(0.96, 0.99, 1.06);

  color = pow(color, vec3(0.88));
  color *= 1.12;

  gl_FragColor = vec4(color, 1.0);
}
`
