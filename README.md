# ⚒ gasrunners workshop
Welcome to our workshop, all our apps and packages are crafted in this repository.

## Development
Almost all commands should be done from the root of the monorepo.

For example:
```
pnpm lint test build
```
Should all be run from root.

To install a dependency in a package or app run (from root):
```
pnpm add <pkg> --filter <namespace>
```
Where `<namespace>` is the name in package.json.

To create a new package run:
```
pnpm create:pkg packages/<pkg-name>
```
This creates a TS package from a template that is ready to be published to NPM
once logic has been added.
