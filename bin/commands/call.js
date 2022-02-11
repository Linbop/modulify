const fs = require("fs-extra");
const path = require("path");
const shell = require("shelljs");
const { getConfiguration } = require("../utils");
  
exports.command = "call <fn> [source]";

exports.describe = "Call function";

exports.builder = {};

exports.handler = function (argv) {
  if (!argv["source"]) {
    argv["source"] = "./";
  }

  const config = getConfiguration(argv);

  let fn = config?.functions ? config.functions[argv["fn"]] : null;

  if (!fn) {
    console.log('Function not found.')
  } else {
    fn({
      fs,
      repoPath: path.join(process.cwd(), `${argv["source"]}`),
      shell,
    });
  }
};
