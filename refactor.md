# Refactor Scully repo.

When we first did build Scully, we did it in an hurry, as we wanted to get things out there. And as we were on the cutting edge of a load of things we used, we didn't always do things the best way. This document is a list of things we want to refactor, and how we want to do it.

## Refactor the repo.

This is a new still empty setup. This is a living document, where we will start adding things as we go.

First thing of order is the structure of the repo. This way around we are going to utilize NPM workspaces. (those wheren't really available when we started this project)
Every package will be in it's own folder, and will have it's own package.json. This will make it easier to manage the dependencies, and will make it easier to publish the packages.

We need to set up a clean structure like this:

```bash
├── documentation
├── kitchen-sink
├── LICENSE
├── package.json
├── plugins
├── README.md
├── refactor.md
├── scully
├── scully-libs
└── workspace-tools
```

(note that this is a work in progress, and will change as we go, for example, there isn't a place for out tests just yet.)

