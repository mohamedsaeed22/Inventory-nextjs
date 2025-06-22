import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    serverExternalPackages: [],
  // Add this to make it accessible from other machines
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
