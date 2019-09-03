const proxy = require('http-proxy-middleware');

// Mock backend ligger på port 8081
const aktørregisterUrl = process.env.AKTORREGISTER_URL || 'http://localhost:8081';

const proxyConfig = {
    changeOrigin: true,
    target: aktørregisterUrl,
    // ex fra https://arbeidsgiver.adeo.no/finn-kandidat/aktoerregister/api/v1/identer?identgruppe=AktoerId&gjeldende=true
    //    til https://app.adeo.no/aktoerregister/api/v1/identer?identgruppe=AktoerId&gjeldende=true
    // TODO: Fiks URL navn i nais filer
    pathRewrite: {
        '^/finn-kandidat': '',
    },
    secure: true,
    xfwd: true,
    logLevel: 'debug',
    // TODO: Fjern logging
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        // Log outbound request to remote target
        console.log('-->  ', req.method, req.path, '->', proxyReq.baseUrl + proxyReq.path);
    },
    onError: function onError(err, req, res) {
        console.error(err);
        res.status(500);
        res.json({error: 'Error when connecting to remote server.'});
    },
};

module.exports = proxy(proxyConfig);
