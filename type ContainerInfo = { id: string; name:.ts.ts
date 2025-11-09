 type ContainerInfo = { id: string; name: string; ports: string }
 const DRY = process.env.ODC_DRY_RUN !== "false" // default true
 
 async function run(cmd: string): Promise<string> {
   if (DRY) return `[DRY_RUN] ${cmd}`
   // Real SSH (optional): requires ODC_SSH_HOST, ODC_SSH_USER, ODC_SSH_KEY
   // and the ssh binary inside the container.
   // import { execFile } from "node:child_process"; import { promisify } from "node:util"
   // const exec = promisify(execFile)
   // const { stdout } = await exec("ssh", [
   //   "-i", process.env.ODC_SSH_KEY!, "-o", "StrictHostKeyChecking=no",
   //   `${process.env.ODC_SSH_USER}@${process.env.ODC_SSH_HOST}`, cmd
   // ])
   // return stdout
   throw new Error("Real SSH disabled. Set ODC_DRY_RUN=false and wire SSH.")
 }
 
 export async function listContainers(): Promise<ContainerInfo[]> {
   const out = await run("docker ps --format '{{.ID}}|{{.Names}}|{{.Ports}}'")
   if (out.startsWith("[DRY_RUN]")) {
     return [
       { id: "demo123", name: "portainer", ports: "9000/tcp" },
       { id: "demo456", name: "uptime-kuma", ports: "3001/tcp" },
     ]
   }
   return out.split("\n").filter(Boolean).map(line => {
     const [id,name,ports] = line.split("|")
     return { id, name, ports }
   })
 }
 
 export async function deploySubdomain(opts: {
   app: string; fqdn: string; image: string; port: number; network?: string
 }) {
   const net = opts.network ?? "dokploy_default"
   const cmd = [
     `docker rm -f ${opts.app} >/dev/null 2>&1 || true`,
     `docker run -d --name ${opts.app}`,
     `--network ${net}`,
     `-l traefik.enable=true`,
     `-l traefik.docker.network=${net}`,
     `-l traefik.http.routers.${opts.app}.rule="Host(\\\`${opts.fqdn}\\\`)"`,
     `-l traefik.http.routers.${opts.app}.entrypoints="http,https"`,
     `-l traefik.http.routers.${opts.app}.tls=true`,
     `-l traefik.http.routers.${opts.app}.tls.certresolver=letsencrypt`,
     `-l traefik.http.services.${opts.app}.loadbalancer.server.port=${opts.port}`,
     `${opts.image}`
   ].join(" \\\n  ")
   return run(cmd)
 }
 
 export async function removeContainer(name: string) {
   return run(`docker rm -f ${name}`)
 }
