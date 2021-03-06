# @skypilot/toolchain

[![npm stable](https://img.shields.io/npm/v/@skypilot/toolchain?label=stable)](https://www.npmjs.com/package/@skypilot/toolchain)
![stable build](https://img.shields.io/github/workflow/status/skypilot-dev/toolchain/Stable%20release?label=stable%20build)
[![npm next](https://img.shields.io/npm/v/@skypilot/toolchain/next?label=next)](https://www.npmjs.com/package/@skypilot/toolchain)
![next build](https://img.shields.io/github/workflow/status/skypilot-dev/toolchain/Prerelease?branch=next&label=next%20build)
![Codacy grade](https://img.shields.io/codacy/grade/f9af94586e474be9b9307217098884c9)
![downloads](https://img.shields.io/npm/dm/@skypilot/toolchain)
[![license: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

An opinionated toolchain for developing Node packages.

Toolchain comes configured with:

-   Babel
-   ESLint
-   Jest
-   TypeScript
-   Lint-Staged (using Husky)
-   GitHub Actions versioning & publication workflows

with a pre-commit hook to enforce linting on commit.

## What does it do

Toolchain installs all dependencies & configurations needed to start creating Node projects
using TypeScript. Compilation, typing, linting, release versioning, and publication are
pre-configured.

## How to install

```console
$ yarn add --dev @skypilot/toolchain
$ yarn toolchain init
```

The `toolchain init` command creates a set of configuration files that include scripts & configs
for distributing the project as a package. A planned change is to have `toolchain init` create only
the core files & configs. A separate command would add the files & configs for creating a package.

If Husky's post-install script isn't run automatically, use the command
`yarn toolchain install-husky` to run the script.

## How to use

Once Toolchain is installed and initialized:

-   The linter will run automatically on each commit
    Note: Branches beginning with `wip-` or ending with `-wip` will not be linted

-   ESLint, Jest, and TypeScript will automatically use the configurations created by Toolchain

GitHub Actions workflows will

-   run code-quality checks on every push to GitHub (except `wip/`, `wip-` and `-wip` branches)
-   publish an NPM package on every push to GitHub on the stable or prerelease branches

### How to publish releases

Toolchain creates GitHub Actions workflows that automate the process of creating and releasing
NPM packages. Two different types of automated releases are supported:

-   **Stable release**: Has an ordinary semver version number, such as `1.1.2`
-   **Prerelease**: Has a version number with a version-tag suffix and iteration number, such as
`1.0.0-beta.0`

The workflows are configured to automatically

-   publish a stable release on every push to `main`
-   publish a prerelease on every push to `alpha`, `beta`, or `next` branch

Toolchain performs the following steps when a release is created. If any step fails, the release is
halted.

-   Run all automated checks (typechecking, linting, and testing)
-   Build the package and generate types
-   Determine the next version number (based on commit messages)
-   Create a version tag
-   Publish the package to NPM (if publication is enabled)
-   If the version stage is designated as the `latest` stage, tag the package as `latest`

For stable releases, the workflow will also:

-   Bump the version number in `package.json`
-   Generate an updated `CHANGELOG.md`
-   Commit these changes to the stable branch
-   Tag the package as `latest`

To designate a stage other than the stable-release branch as the `latest`
stage, add the stage name to `.skypilot/quick-release.yaml`.

Example: This setting designates the `beta` stage as the latest stage.

```yaml
prerelease:
  latestStage: 'beta'
```

### Convenience scripts

These convenience scripts are added to `package.json` by `yarn toolchain init`:

-   `all-ci-checks`: Locally run the status checks that are run by the continuous-integration workflow
-   `all-cq-checks`: Run code-quality checks: linting, type-checking, and standalone tests
-   `build`: Build the project for distribution as an NPM package
-   `ci`: An alias for `all-ci-checks`
-   `cq`: An alias for `all-cq-checks`
-   `generate-typings`: Generate typings for the distribution
-   `lint`: Run the linter
-   `prepublishOnly`: Run all checks and build steps in preparation for publication to NPM
-   `tc`: An alias for `typecheck`
-   `test`: An alias for `test:standalone`
-   `test:all`: Run all tests using Jest
-   `test:integration`: Run all integration tests (tests that rely on external services) using Jest
-   `test:standalone`: Run all standalone tests (app, component, and unit tests, which do not rely
-   `typecheck`: Checks that all types in the project are valid

To run a script, use `yarn run SCRIPT_NAME`.
