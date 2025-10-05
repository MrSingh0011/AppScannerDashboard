/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/AppScannerDashboard',
  assetPrefix: '/AppScannerDashboard/',
  images: {
    unoptimized: true
  }
}

export default nextConfig