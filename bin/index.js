#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command(require("./commands/build.js"))
  .command(require("./commands/script.js"))
  .command(require("./commands/call.js"))
  .boolean("watch")
  .parse();