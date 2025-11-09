// Placeholder adapters that make the build & API routes work.
// Later: replace with real SSH (e.g., ssh2) or a Dokploy API call.
export async function listContainers() {
  return [{ name: "example", image: "nginx:alpine", status: "running" }]
}

export async function deploySubdomain(opts: {
  appName: string
  fqdn: string
  appPort: number
  image: string
  dockerNetwork?: string
}) {
  const { appName, fqdn, appPort, image, dockerNetwork = "dokploy_default" } = opts
  // no-op for now:
  return `Simulated deploy of ${appName} -> https://${fqdn} (${image} on ${dockerNetwork}, port ${appPort})`
}

export async function removeContainer(appName: string) {
  // no-op for now:
  return `Simulated removal of ${appName}`
}