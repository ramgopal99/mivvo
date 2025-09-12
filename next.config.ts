import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Monaco Editor optimizations
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api.js',
      };
    }

    return config;
  },
};

export default nextConfig;
