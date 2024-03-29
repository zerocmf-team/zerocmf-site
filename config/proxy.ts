/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

const proxy:any = {
    dev: {
        '/api/': {
            target: 'http://www.zerocmf.com',
            changeOrigin: true,
            pathRewrite: {
                '^': '',
            },
        },
        '/uploads/': {
            target: 'http://www.zerocmf.com',
            changeOrigin: true,
            pathRewrite: {
                '^': '',
            },
        },
    },
    test: {
        '/api/': {
            target: 'http://localhost:9080',
            changeOrigin: true,
            pathRewrite: {
                '^': '',
            },
        },
    },
    pre: {
        '/api/': {
            target: 'http://localhost:9080',
            changeOrigin: true,
            pathRewrite: {
                '^': '',
            },
        },
    },
};

export default proxy