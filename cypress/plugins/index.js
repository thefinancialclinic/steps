// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
require('dotenv').config({ path: '.env' });
const { CYPRESS_AUTH0_BEARER_TOKEN, AUTH0_ENABLED } = process.env;

module.exports = (on, config) => {
  console.log(process.env);

  const env = config.env.configFile || 'development';

  const configFile =
    env === 'ci'
      ? require(`../config/cypress.${env}.json`)
      : {
          baseUrl: 'http://localhost:3000',
          env: {
            API_URL: 'http://localhost:3001/api',
            AUTH0_BEARER_TOKEN: CYPRESS_AUTH0_BEARER_TOKEN,
            AUTH0_ENABLED: AUTH0_ENABLED,
          },
          defaultCommandTimeout: 10000,
        };

  return configFile;
};
