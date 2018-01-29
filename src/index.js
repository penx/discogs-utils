#!/usr/bin/env node
const collection = require("./scripts/collectionToFolders");

require("yargs")
  .usage("$0 <cmd> [args]")
  .command(
    "collection [name]",
    "welcome ter yargs!",
    yargs => {
      yargs.positional("token", {
        type: "string",
        describe: "Discogs token"
      });
      yargs.positional("user", {
        type: "string",
        describe: "Discogs user"
      });
    },
    argv => {
      collection({
        userToken: argv.token,
        user: argv.user
      });
    }
  )
  .help().argv;
