# Modulify

There are a lot of tools that can be used to build and maintain JS/TS monorepos, which are also support build scripts.
**Modulify** is one of them, but simpler and faster. 

As a build tool modulify uses esbuild.

Modulify gives you the advantages listed below:

- Easily run esbuild commands
- Watch for changes and rebuild the project
- Use beforeBuild and afterBuild hooks in order to copy, move files and dependencies or execute additional shell scripts.
- Flexible configuration with config.modulify.js files
- Create and execute functions from CLI, in Docker containers (Dockerfile) and etc. You can also execute shell scripts inside modulify functions.
- Easily create and execute scripts concurrently or synchronously.
<!-- - Execute shell scripts with ZX (coming soon) -->

> Modulify is the result of analyzing and testing such tools as NX, Rush, Lerna, yarn workspaces, npm workspaces.