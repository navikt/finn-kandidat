const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsPath) {
    fsExtra.ensureFile(settingsPath).then(f => {
        fsExtra.writeFileSync(
            settingsPath,
            `window.appSettings = {
               AKTORREGISTER_URL: '${process.env.AKTORREGISTER_URL}'
            };`
        );
    });
}

module.exports = createEnvSettingsFile;
