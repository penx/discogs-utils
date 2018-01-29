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

function collection({userToken, user}) {
  console.log(userToken);
  console.log(user);
  const client = getClient(userToken);

  client
    .user()
    .collection()
    .getFolders(user)
    .then(data => {
      console.log(data);
      return Promise.all(
        data.folders.filter(folder => folder.id !== 0).map(folder => {
          return getReleases(client, user, folder.id)
            .then(releases => {
              writeOutput(folder, releases);
              // createFolderStructure(folder.name, releases);
            })
            .catch(error => console.log(error));
        })
      );
    })
    .catch(error => console.log(error));
}

module.exports = collection;
