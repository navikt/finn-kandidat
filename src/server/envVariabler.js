const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsPath) {
    fsExtra.ensureFile(settingsPath).then(f => {
        fsExtra.writeFileSync(
            settingsPath,
            `window.appSettings = {
               AKTØRREGISTER_URL: '${process.env.AKTØRREGISTER_URL}'
            };`
        );
    });
}

module.exports = createEnvSettingsFile;
