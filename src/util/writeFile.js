const fs = require("fs");
const { promisify } = require("util");

async function writeFile(filename, json) {
  const data = JSON.stringify(json, null, 2);
  await promisify(fs.writeFile)(filename, data);
}

module.exports = writeFile;
