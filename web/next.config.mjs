/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build_node',
    env: {
        API_ACCOUNT_SERVICE: "http://192.168.10.201:5000/",
        API_REPORT_SERVICE: "http://192.168.10.201:5001/"
    }
};

export default nextConfig;