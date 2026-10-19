import type { NextConfig } from "next";

// Internal backend URL used by the Next.js server to proxy /api and /uploads.
// In the Coolify docker-compose stack this is http://backend:5000 (service name);
// locally it falls back to localhost:5000 (and is unused, since dev fetches the
// backend directly via NEXT_PUBLIC_API_URL).
const BACKEND = process.env.BACKEND_INTERNAL_URL || "http://localhost:5000";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  output: "standalone",
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${BACKEND}/api/:path*` },
      { source: "/uploads/:path*", destination: `${BACKEND}/uploads/:path*` },
    ];
  },
};

export default nextConfig;
