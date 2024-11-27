import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'http://localhost:8080/:path*',
        destination: 'https://emergencyaid-dot-bytecoders-coms4156.uk.r.appspot.com/:path*',
      },
    ]
  },
};

export default nextConfig;
