/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@react-pdf/renderer"],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false, os: false, path: false };
        return config;
    },
};

export default nextConfig;
