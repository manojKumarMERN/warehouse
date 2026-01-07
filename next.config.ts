import type { NextConfig } from "next";
import type { LoggingConfig } from "next/dist/server/config-shared";

const LoggingConfig: LoggingConfig = {
  fetches: {
    fullUrl: true
  }
}

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
    browserDebugInfoInTerminal: true,
    globalNotFound: true,

  },
  cacheComponents: true,
  logging: LoggingConfig,
};

export default nextConfig;
