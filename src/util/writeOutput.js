const jsonfile = require("jsonfile");
const sanitize = require("sanitize-filename");

function writeOutput(folder, releases) {
  console.log("writing file");
  try {
    const filename = "output/" + sanitize(`${folder.name}.json`);
    console.log("writing to " + filename);
    jsonfile.writeFile(
      filename,
      releases,
      {
        spaces: 2
      },
      e => {
        console.log(e);
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = writeOutput
