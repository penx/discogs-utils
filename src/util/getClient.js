const { version } = require("../../package.json");
const Discogs = require("disconnect").Client;

function getClient(userToken) {
  return new Discogs(`DiscogsUtils/${version}`, {
    // TODO: get token from env var or cli flag
    userToken
  });
}

module.exports = getClient;
