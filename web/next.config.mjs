/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build_node',
    // env: {
    //     API_ACCOUNT_SERVICE: "http://localhost:5000/",
    //     API_REPORT_SERVICE: "http://localhost:5001/",
    //     API_NOTIFICATION: "http://localhost:5002/"
    // }
    env: {
        API_ACCOUNT_SERVICE: "https://autenticacion.blackgrass-9559a3b0.westus2.azurecontainerapps.io/",
        API_REPORT_SERVICE: "https://reportes.blackgrass-9559a3b0.westus2.azurecontainerapps.io/",
        API_NOTIFICATION: "https://notificaciones.blackgrass-9559a3b0.westus2.azurecontainerapps.io/"
        
    }
};

export default nextConfig;