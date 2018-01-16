const fs = require("fs");

const jsonfile = require("jsonfile");
const sanitize = require("sanitize-filename");

function createFolderStructure(name, releases) {
  const foldername = "output/" + sanitize(`${name}`);
  if (!fs.existsSync(foldername)) {
    fs.mkdirSync(foldername);
    console.log("releases.length");
    console.log(releases.length);
    releases[0].map(release => {
      console.log(release.basic_information);
      const cat = release.basic_information.labels[0].catno;
      const artist = release.basic_information.artists[0].name;
      const title = release.basic_information.title;
      const releaseFolderName = `${foldername}/[${sanitize(cat)}] ${sanitize(
        artist
      )} - ${sanitize(title)}`;
      if (!fs.existsSync(releaseFolderName)) {
        fs.mkdirSync(releaseFolderName);
      }
      jsonfile.writeFile(`${releaseFolderName}/index.json`, release);

      console.log();
    });
    // releases.
  } else {
    console.log("folder already exists, skipping: " + foldername);
  }
}

module.exports = createFolderStructure;
