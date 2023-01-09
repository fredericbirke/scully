# Refactor Scully repo.

When we first did build Scully, we did it in an hurry, as we wanted to get things out there. And as we were on the cutting edge of a load of things we used, we didn't always do things the best way. This document is a list of things we want to refactor, and how we want to do it.

## Refactor the repo.

This is a new still empty setup. This is a living document, where we will start adding things as we go.

First thing of order is the structure of the repo. This way around we are going to utilize NPM workspaces. (those wheren't really available when we started this project)
Every package will be in it's own folder, and will have it's own package.json. This will make it easier to manage the dependencies, and will make it easier to publish the packages.

We need to set up a clean structure like this:

```bash
├── documentation
├── e2e (includes the apps or other needed stuff to do FULL testing of scully)
├── LICENSE
├── package.json
├── plugins (includes none related system/core plugins)
├── README.md
├── refactor.md
├── scully
├─── cli
├─── ng-lib
├─── platform-server
├─── etc....
└── workspace-tools
```

Each off theses folder has the following layout if the package will be published


```bash
├── src (includes all source files)
├── test (includes all test files)
├── README
├── .eslintrc (for linting)
├── package.json
├── tsconfig.json
├── tsconfig.lib.json
├── tsconfig.spec.json

```


# Tools

1. EsLint for linting all files (this will be in combinartion with typescript-eslint)
2. Relaease Please as GH action to take control over SemVer for all packages
3. Husky, lint-staged, prettier and commitlint for making sure that formatting and commit is correct.
4. *Test tool needs to be checked*
(note that this is a work in progress, and will change as we go, for example, there isn't a place for out tests just yet.)

