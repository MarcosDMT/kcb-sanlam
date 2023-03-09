/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://kit.fontawesome.com;
  child-src 'self' https://sc.sanlam.co.ke;
  style-src 'self'  'unsafe-inline' https://fonts.googleapis.com https://ka-f.fontawesome.com ;
  font-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com  https://ka-f.fontawesome.com/releases/v5.15.4/webfonts/;
  connect-src 'self' https://ka-f.fontawesome.com https://ka-p.fontawesome.com;
  img-src 'self' data:
`
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // {
  //   key: 'Content-Security-Policy',
  //   value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  // },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
]
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
