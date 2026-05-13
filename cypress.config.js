const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://panel-dev.temansantaimu.com',
    setupNodeEvents(on, config) {
    },
    specPattern: 'cypress/e2e/**/!(*update-profile).cy.js', //exclude update-profile.cy.js karena akan merubah credential login yang diperlukan untuk testscript lainnya
    // specPattern: 'cypress/e2e/**/*.cy.js', //run semua file cy.js di folder e2e
    // specPattern: 'cypress/e2e/1-panel-admin/1-auth', //run semua file pada folder 1-panel-admin/auth di dalam e2e
    // specPattern: 'cypress/e2e/1-panel-admin/auth/login.cy.js', //hanya run file login.cy.js di folder 1-panel-admin/auth
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    pluginsFile: 'cypress/plugins/index.js',
    video: true,
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});