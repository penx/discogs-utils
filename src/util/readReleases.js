const jsonfile = require("jsonfile");

function readReleases(filename) {
  return jsonfile.readFileSync(filename);
}

module.exports = readReleases;
