const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "https://blind-spot-detection.onrender.com",
      changeOrigin: true,
    })
  );
  
  // You can add more proxies for different paths
  app.use(
    '/auth',
    createProxyMiddleware({
      target: "https://blind-spot-detection.onrender.com",
      changeOrigin: true,
    })
  );
};
