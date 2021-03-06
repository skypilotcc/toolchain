/* These configs are direct copies of the configs used in Toolchain itself. */
import { SourceAndTarget } from './bulkReadTransformWrite';

export const COPIED_CONFIGS: string[] = [
  '.github/workflows/node-check-code.yaml',
  '.github/workflows/node-prerelease.yaml',
  '.github/workflows/node-stable-release.yaml',
  '.editorconfig',
  '.eslintignore',
  '.eslintrc.js',
  '.gitignore',
  '.huskyrc.js',
  '.lintstagedrc.js',
  '.nvmrc',
  'babel.config.js',
  'jest.config.js',
  'jest.integration.config.js',
  'jest.standalone.config.js',
  'src/scripts/.eslintrc.js',
];

export const MOVED_CONFIGS: SourceAndTarget[] = [];

/* These configs are stored in the package (`THIS_PACKAGE_NAME/lib`) and referenced by
   other configs. */
export const REFERENCED_CONFIGS: string[] = [
  'configs/tsconfig.generate-typings.json',
  'configs/tsconfig.main.json',
];

/* These configs contain variables that need replacement with values supplied by the consuming project. */
export const CONFIG_TEMPLATES: string[] = [
  'tsconfig.generate-typings.json',
  'tsconfig.json',
];
