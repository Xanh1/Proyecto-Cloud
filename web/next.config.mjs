/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build_node',
    env: {
        API_ACCOUNT_SERVICE: "http://localhost:5000/"
    }
};

export default nextConfig;