exports.commandBuilder = function commandBuilder() {
  const pipes = [];

  const processCMD = (cmd) => {
    if (typeof cmd === 'string') {
      return cmd.trim();
    } else if (typeof cmd === 'object' && cmd.finalize) {
      return cmd.finalize();
    }

    return cmd;
  }

  const pipeline = {
    add: (cmd) => {
      if (cmd) {
        if (Array.isArray(cmd)) {
          pipes.push(`concurrently "${cmd.map(c => processCMD(c)).join('" "')}"`);
        } else {
          pipes.push(processCMD(cmd));
        }
      }

      return pipeline;
    },
    waitOn: (cmd) => {
      if (cmd) {
        pipes.push(`wait-on ${processCMD(cmd)}`);
      }

      return pipeline;
    },
    finalize: () => pipes.join(" && "),
    log: () => console.log(pipes),
  };

  return pipeline;
};

