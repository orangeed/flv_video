// const path = require('path')
module.exports = {
    publicPath: './',
    chainWebpack: config => {

        config.module
            .rule('swf')
            .test(/\.swf$/)
            .use('url-loader')
            .loader('url-loader')
            .options({
                limit: 10000
            })
    },

    // resolve: {
    //     modules: [path.resolve('node_modules'), 'node_modules'],
    // }
}