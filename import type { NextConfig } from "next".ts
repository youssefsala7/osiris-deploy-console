 import type { NextConfig } from "next"
 const nextConfig: NextConfig = {
   output: "standalone",
   experimental: {
     serverComponentsExternalPackages: ["ssh2"] // harmless if unused
   }
 }
 export default nextConfig
