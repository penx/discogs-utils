const fs = require("fs");

const jsonfile = require("jsonfile");
const sanitize = require("sanitize-filename");

function createFolderStructure(name, releases) {
  const foldername = "output/" + sanitize(`${name}`);
  if (!fs.existsSync(foldername)) {
    fs.mkdirSync(foldername);
    releases.map(release => {
      const cat = release.basic_information.labels[0].catno
        .replace(/[-. ]/gi, "")
        .toUpperCase();
      const artist = release.basic_information.artists[0].name;
      const title = release.basic_information.title;
      const releaseFolderName = `${foldername}/[${sanitize(cat)}] ${sanitize(
        artist
      )} - ${sanitize(title)}`;
      if (!fs.existsSync(releaseFolderName)) {
        fs.mkdirSync(releaseFolderName);
      }
      jsonfile.writeFile(`${releaseFolderName}/index.json`, release);
    });
    // releases.
  } else {
    console.log("folder already exists, skipping: " + foldername);
  }
}

module.exports = createFolderStructure;
