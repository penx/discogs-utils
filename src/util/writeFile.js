const fs = require("fs");
const { promisify } = require("util");

async function writeFile(filename, json) {
  const data = JSON.stringify(json);
  await promisify(fs.writeFile)(filename, data, {
    spaces: 2
  });
}

module.exports = writeFile;
