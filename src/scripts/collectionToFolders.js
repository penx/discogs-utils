// generate token at https://www.discogs.com/settings/developers

// 1. create folder structure
// for each collection
//  - create folder
//  - for each release
//    - create folder
//    - create json file for each track
const getReleases = require("../util/getReleases");
const writeOutput = require("../util/writeOutput");
// const createFolderStructure = require("../util/createFolderStructure");
const getClient = require("../util/getClient");

async function collection({ userToken, user }) {
  console.log(userToken);
  console.log(user);
  const client = getClient(userToken);

  const data = await client
    .user()
    .collection()
    .getFolders(user);

  console.log(data);
  for (const folder of data.folders.filter(folder => folder.id !== 0)) {
    const releases = await getReleases(client, user, folder.id);
    writeOutput(folder, releases);
  }
}

module.exports = collection;
