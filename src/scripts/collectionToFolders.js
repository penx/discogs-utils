// generate token at https://www.discogs.com/settings/developers

// 1. create folder structure
// for each collection
//  - create folder
//  - for each release
//    - create folder
//    - create json file for each track
const commander = require("commander");
const { version } = require("../../package.json");

const getReleases = require("../util/getReleases");
const writeOutput = require("../util/writeOutput");
const getClient = require("../util/getClient");
const config = require("../config");

commander
  .version(version)
  .usage("<source> <target>")
  .parse(process.argv);

const client = getClient(config.userToken);

client
  .user()
  .collection()
  .getFolders(config.user)
  .then(data => {
    return Promise.all(
      data.folders.map(folder => {
        return getReleases(client, config.user, folder.id)
          .then(releases => {
            writeOutput(folder, releases);
          })
          .catch(error => console.log(error));
      })
    );
  })
  .catch(error => console.log(error));
