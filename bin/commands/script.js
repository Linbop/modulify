const fs = require("fs-extra");
const esbuild = require("esbuild");
const chokidar = require("chokidar");
const path = require("path");
// const chalk = require('chalk');
const { exec } = require("child_process");
const { getConfiguration } = require("../utils");
  
exports.command = "script <script> [source]";

exports.describe = "Run modulify script";

exports.builder = {};

exports.handler = function (argv) {
  if (!argv["source"]) {
    argv["source"] = "./";
  }

  const config = getConfiguration(argv);

  let script = config?.scripts ? config.scripts[argv['script']] : null;

  if (typeof script === 'object') script = script?.finalize();

  if (!script) {
    console.log('Script not found.')
  } else {
    const childProcess = exec(`${script}`, {});
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
  }
};
