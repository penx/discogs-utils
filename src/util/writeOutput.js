const sanitize = require("sanitize-filename");

const writeFile = require("./writeFile");

async function writeOutput(folder, releases) {
  console.log("writing file");
  try {
    // TODO: create output dir if doesn't exist
    const filename = "output/" + sanitize(`${folder.name}` + `/index.json`);
    console.log("writing to " + filename);
    await writeFile(filename, releases);
  } catch (err) {
    console.log("error 2");
    console.log(err);
  }
}

module.exports = writeOutput;
