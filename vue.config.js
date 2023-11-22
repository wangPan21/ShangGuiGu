const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //关闭eslint检查
    lintOnSave: false,
    //代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                // pathRewrite: { '^/api': '' },
            },
        },
    },
})