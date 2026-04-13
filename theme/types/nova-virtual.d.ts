declare module 'virtual:nova-link-cache' {
  const cache: {
    links: Array<{ from: string, to: string }>
  }
  export default cache
}
