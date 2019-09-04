const proxy = require('http-proxy-middleware');

const aktørregisterUrl = process.env.AKTORREGISTER_URL || 'http://localhost:8081';

const proxyConfig = {
    changeOrigin: true,
    target: aktørregisterUrl,
    pathRewrite: {
        '^/finn-kandidat': '',
    },
    secure: true,
    xfwd: true
};

module.exports = proxy(proxyConfig);
