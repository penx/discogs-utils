// generate token at https://www.discogs.com/settings/developers

// 1. create folder structure
// for each collection
//  - create folder
//  - for each release
//    - create folder
//    - create json file for each track
const commander = require("commander");
const { version } = require("../../package.json");

const readReleases = require("../util/readReleases");
const createFolderStructure = require("../util/createFolderStructure");

commander
  .version(version)
  .usage("<source> <target>")
  .parse(process.argv);

const releases = readReleases("./index.json");
createFolderStructure(".", releases);
