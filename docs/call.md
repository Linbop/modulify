# call command

call command can be used in order to execute a function defined in configs.

```bash
modulify call <fn> [source]
```

modulify will look for the function in CWD if source is not defined or function not defined in the source.

Below you can see example sayHi function example:

```javascript
//config.modulify.js
module.exports = {
  functions: {
    sayHi: () => {
      console.log('Hello ', process.env.NAME)
    }
  },
};
```

```bash
modulify call sayHi
or
modulify call sayHi repositories/project-a
```


## Use cases
One of the use cases of modulify functions is in docker containers.

For example, if we want to RUN different commands or execute CMD depending on ENV variables and etc.

Modulify functions receive an object with fs, rootPath and shell parameters.

`repoPath` - build  source absolute path

`fs` - instance of fs-extra

`shell` - instance of shelljs (in order to run any shell script)

Example of Dockerfile

```
FROM node:16

WORKDIR /app
COPY package*.json ./

RUN yarn install
RUN npm install -g modulify

RUN modulify call copyDependencies repositories/project-a

EXPOSE 3001

CMD modulify call runStart repositories/project-a
```

> modulify will replace shell scripts for you.