const fs = require("fs-extra");
const esbuild = require("esbuild");
const chokidar = require("chokidar");
const path = require("path");
const chalk = require('chalk');
const shell = require("shelljs");

const { getConfiguration } = require('../utils')

const build = async (args, config) => {
  console.log(chalk.cyan(`Building `), chalk.yellow(args["source"]));
  const buildConfig =
    typeof config.build === "function"
      ? await config.build({
          repoPath: path.join(process.cwd(), args["source"]),
          fs,
          shell,
        })
      : config.build;

  if (!buildConfig) throw 'Build config not found.'
  
  await esbuild.build(buildConfig);
  console.log(chalk.bgGreen.black(`Build for ${args["source"]} completed.`));

  return;
};

const watch = async (args, config) => {
  console.log(chalk.cyan(`<=== WATCHING FOR CHANGES ===>`));

  const watcher = chokidar.watch(
    [path.join(process.cwd(), `${args["source"]}/src`)],
    {}
  );

  watcher.on("change", async () => {
    console.log(chalk.magenta(`Changes detected, re-building ...`));
    
    await run(args, config);
  });
};

const run = async (args, config) => {
  const fnArguments = {
    repoPath: path.join(process.cwd(), args["source"]),
    fs,
    shell,
  };

  if (config.beforeBuild) {
    console.log(chalk.cyan(`Running beforeBuild action`));
    await config.beforeBuild(fnArguments);
  }

  try {
    await build(args, config);
  } catch (e) {
    console.log(chalk.bgRed('Build failed'), e?.message || e);
  }
  

  if (config.afterBuild) {
    console.log(chalk.cyan(`Running afterBuild action`));
    await config.afterBuild(fnArguments);
  }
};

exports.command = "build [source]";

exports.describe = "build source";

exports.builder = {
  watch: {
    default: false,
  },
};

exports.handler = function (argv) {
  if (!argv['source']) {
    argv["source"] = './';
  }
  const config = getConfiguration(argv);
  run(argv, config);
  if (argv["watch"]) watch(argv, config);
};
