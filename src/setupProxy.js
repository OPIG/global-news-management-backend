// Configuring the Proxy Manually
// https://create-react-app.dev/docs/proxying-api-requests-in-development
// 解决跨域问题

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    "/bdNews",
    createProxyMiddleware({
      target: 'http://news.baidu.com',
      changeOrigin: true,
      pathRewrite: {
        '^/bdNews': '',
      }
    })
  ),
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
      pathRewrite: {
        "^/api": ''
      }
    })
  )
}