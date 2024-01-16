/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
            sharp: 'commonjs sharp',
            canvas: 'commonjs canvas',
        });
        return config;
    },
    images: {
        formats: ["image/webp",  "image/avif"],
        domains: ['192.168.0.18', '127.0.0.1', 'localhost'],
    }
}

module.exports = nextConfig
