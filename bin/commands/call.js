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

  const paths = {
    project: process.cwd(),
    repo: path.join(process.cwd(), `${argv["source"]}`),
  };

  let fn = config?.functions ? config.functions[argv["fn"]] : null;

  if (!fn) {
    console.log('Function not found.')
  } else {
    fn({
      fs,
      paths,
      shell,
    });
  }
};
