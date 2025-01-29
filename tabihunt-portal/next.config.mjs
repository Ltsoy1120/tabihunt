/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.tabihunt.kz",
        port: "",
        pathname: "/api/files/**"
      }
    ]
  }
}

export default nextConfig
