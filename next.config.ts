import type { NextConfig } from 'next';

const nextConfig: NextConfig = process.env.GITHUB_PAGES === 'true'
  ? {
      output: 'export',
      basePath: '/Trigate-Case-Study',
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
