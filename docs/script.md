# script command

Consider the scenario below:

We want to listen source directory for changes, rebuild on any change, and run nodemon if server.js file exists in the build directory.

With modulify, concurrently and wait-on packages the command will look like this

```
concurrently "modulify build repositories/package-a --watch" "wait-on repositories/package-a/build/server.js && nodemon repositories/package-a/build/server.js"
```

We can create the same command with modulify command builder

```javascript
// modulify.config.js
const { commandBuilder: cb } = require('modulify');

module.exports = {
  scripts: {
    "watch:start:project-a": cb()
      .add([
        "modulify build repositories/project-a --watch",
        cb()
          .waitOn("repositories/project-a/build/server.js ")
          .add("nodemon repositories/project-a/build/server.js")
      ])
  },
};

```

```bash
modulify script <script> [source]
```

Pipeline methods

`add` - receives string or array. Commands in an array will be executed concurrently.

`waitOn` - wait-on command.

`finalize` - returns built command.

> Created modulify commands can be executed as package.json script

```
// package.json
{
  ...
  "scripts": {
    "watch:start:project-a": "modulify script watch:start:project-a"
  }
  ,
  ...
}
```

```
yarn run watch:start:project-a
```