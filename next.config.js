/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['graphql-request']
    }
};

module.exports = nextConfig;
