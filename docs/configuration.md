# Configuration

modulify will look for configuration files in two directories: CWD and source directory.

Source configurations will rewrite root configurations. 

> The use case for the root configuration is to use same config for the similar projects. 

Configuration file name must be `config.modulify.js`

Below is an example of a typical config file

```javascript
  const path = require('path');

  module.exports = {
    build: ({ repoPath }) => ({
      entryPoints: [`${repoPath}/src/index.ts`],
      outfile: `${repoPath}/build/server.js`,
      bundle: true,
      platform: "node",
      target: "node16",
    }),
    functions: {
      sayHi: ({ shell }) => {
        shell.exec("node --version");
        console.log("ENV: ", process.env);
      },
      createFile: ({ fs }) => {
       ...
      },
    },
    beforeBuild: async ({ fs, repoPath }) => {
      ...
    },
    afterBuild: () => {
      ...
    },
  };
```

The final config object is a result of root and source configurations.

```javascript
  const finalConfig = {
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
  }
```