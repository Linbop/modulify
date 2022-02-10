# build command

modulify uses `esbuild` as a build tool.

## Usage
```bash
modulify build [source] [options]
```
If source not defined, modulify will build CWD (current directory the script run from).

Source - is the path related to the CWD. For ex. If you are in ROOT directory and want to build ROOT/repositories/project-a, then the source should be `repositories/project-a` or `./repositories/project-a`

`--watch` options can be set in order to watch the source directory for changes and run re-build on change events.

modulify will look for a `config.modulify.js` configuration file in the CWD and source directories. For more info refer to the [Configuration](/configuration) page. All esbuild build configuration can be passed by `config.build` parameter. `config.build` can be an object or a function. 


```javascript
// build object
const path = require('path');

module.exports = {
  build: {
    entryPoints: [path.join(process.cwd(), 'repositories/project-a/src/index.ts')],
    outfile: path.join(process.cwd(), 'repositories/project-a/build/server.js'),
    bundle: true,
    platform: "node",
    target: "node16",
  },
};
```

```javascript
// build function
module.exports = {
  build: ({ repoPath }) => ({
    entryPoints: [`${repoPath}/src/index.ts`],
    outfile: `${repoPath}/build/server.js`,
    bundle: true,
    platform: "node",
    target: "node16",
  }),
};
```

build function an an argument received an object with the following properties:

`repoPath` - build  source absolute path

`fs` - instance of fs-extra

`shell` - instance of shelljs (in order to run any shell script)

modulify expands esbuild with the before and after build action.
`beforeBuild` and `afterBuild` methods should be defined in the `config.modulify.js` file.

```javascript
module.exports = {
  build: ({ fs, repoPath, shell }) => {
    ...
  },
  beforeBuild: async ({ fs, repoPath, shell }) => {
    ...
  },
  afterBuild: async ({ fs, repoPath, shell }) => {
    ...
  },
};
```

> If you have similar projects, you can create one common config (ROOT configuration) for all of them.