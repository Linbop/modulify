const path = require('path');
const chalk = require('chalk');

const getConfiguration = (args) => {
  let initialConfig = {};
  let rootConfig = {};
  let sourceConfig = {};

  console.log(chalk.cyan(`Looking for `), chalk.yellow(`config.modulify.js`));
  try {
    rootConfig = require(path.join(process.cwd(), `config.modulify.js`));
  } catch (e) {
    console.log(chalk.magenta("Root configuration not found."));
  }

  if (args["source"] !== "." && args["source"] !== './') {
    console.log(
      chalk.cyan(`Looking for `),
      chalk.yellow(`${args["source"]}/config.modulify.js`)
    );
    try {
      sourceConfig = require(path.join(
        process.cwd(),
        `${args["source"]}/config.modulify.js`
      ));
    } catch (e) {
      console.log(chalk.magenta("Source configuration not found."));
    }
  }

  // build, functions, scripts, beforeBuild, afterBuild

  const {
    functions: initialFunctions,
    scripts: initialScripts,
    ...initialProps
  } = initialConfig;

  const {
    functions: rootFunctions,
    scripts: rootScripts,
    ...rootProps
  } = rootConfig;

  const {
    functions: sourceFunctions,
    scripts: sourceScripts,
    ...sourceProps
  } = sourceConfig;

  return {
    functions: {
      ...initialFunctions,
      ...rootFunctions,
      ...sourceFunctions
    },
    scripts: {
      ...initialScripts,
      ...rootScripts,
      ...sourceScripts
    },
    ...initialProps,
    ...rootProps,
    ...sourceProps
  };
};

module.exports = {
  getConfiguration,
};