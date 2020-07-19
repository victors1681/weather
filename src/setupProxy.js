const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/weather',
    createProxyMiddleware({
      target: 'https://api.openweathermap.org/data/2.5',
      changeOrigin: true,
    })
  );
};