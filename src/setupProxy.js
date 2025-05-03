const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
<<<<<<< HEAD
      target: 'https://blind-spot-detection.onrender.com',
=======
      target: "https://blind-spot-detection.onrender.com",
      changeOrigin: true,
    })
  );
  
  // You can add more proxies for different paths
  app.use(
    '/auth',
    createProxyMiddleware({
      target: "https://blind-spot-detection.onrender.com",
>>>>>>> aba3df94ece5af37bc5a3bc97b0d10abd320a0d9
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api prefix when forwarding
      },
    })
  );
};
