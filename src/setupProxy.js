// 若下载的版本18以上：
// const Proxy = require('http-proxy-middleware');


// module.exports = function(app) {
//     app.use(
//         Proxy.createProxyMiddleware('/api',{ // 发起请求携带/api，走以下
//             target:'http://localhost:8000', // 请求转发给的端口
//             changeOrigin:true, // 我理解的是改变同源
//             pathRewrite:{'/api':''}  // 把携带的/api清掉，到服务器是没有/api的
//         })
//     )
// }

// 若下载的版本18以下：
const Proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        Proxy('/api', {
            target: 'http://192.168.1.161:5050',
            changeOrigin: true,
            pathRewrite: { '/api': '' }
        })
    )
}