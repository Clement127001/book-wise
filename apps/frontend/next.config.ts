import type { NextConfig } from "next";

const getEnvConfig = () => {
  switch (process.env.ENV) {
    case "dev": {
      return {
        env: "dev",
        apiUrl: "http://localhost:3000",
        frontendUrl: "http://localhost:3001",
        projectId: "book-wise-dev",
      };
    }

    case "prod": {
      return {
        env: "dev",
        apiUrl: "http://localhost:3000",
        frontendUrl: "http://localhost:3001",
        projectId: "book-wise-dev",
      };
    }
  }
};

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  images: {
    unoptimized: true,
  },
  publicRuntimeConfig: getEnvConfig(),
};

export default nextConfig;
