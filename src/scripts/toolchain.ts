#!/usr/bin/env node
import { exec } from 'child_process';
import util from 'util';
import { deindentTemplateLiteral } from '../common/string/deindentTemplateLiteral';

const args = process.argv.slice(2);
const HELP_FLAGS = ['--help', '-h', '-?'];

function hasIntersection<T>(array1: T[], array2: T[]): boolean {
  for (let i = 0; i < array1.length; i += 1) {
    const item = array1[i];
    if (array2.includes(item)) {
      return true;
    }
  }
  return false;
}

type ShowHelpAndExitOptions = {
  exitCode?: number;
  message?: string;
};

function showHelpAndExit(options: ShowHelpAndExitOptions): void {
  const { exitCode = 0, message } = options;
  const errorMessage = message ? `Error: ${message}` : 'Error';
  const usage = deindentTemplateLiteral`
  ${errorMessage}

  Usage: toolchain COMMAND

  Where COMMAND is one of:
    - init            create configuration files and package-file scripts
    - install-husky   install Husky Git hooks
  `;
  console.log(usage);
  process.exit(exitCode);
}

if (hasIntersection(args, HELP_FLAGS)) {
  showHelpAndExit({ exitCode: 0 });
}

if (args.length !== 1) {
  showHelpAndExit({ exitCode: 1 });
}

type Command = 'init';
function resolvePathToExecutable(executableName: Command): string {
  return require.resolve(`.bin/toolchain-${executableName}`);
}

const validCommands = ['init', 'install-husky'];

const command = args[0];

if (!validCommands.includes(command)) {
  showHelpAndExit({ exitCode: 1, message: `Unknown command '${command}'` });
}

const commandString = resolvePathToExecutable(command as Command);
const execAsync = util.promisify(exec);
(
  async () => {
    try {
      const { stderr, stdout } = await execAsync(commandString, {});
      if (stderr) {
        console.error(stderr);
        process.exit(1);
      }
      console.log(stdout.trim());
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
)();