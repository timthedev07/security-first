#!/usr/bin/env node

import { appendFileSync } from "fs";
import inquirer from "inquirer";
import { write } from "clipboardy";

const EXTRA_LENGTH_FACTOR = 5;

const PASSWORD_CUSTOMIZATION_OPTIONS = {
  num: "with-numbers",
  upper: "with-uppercase",
  special: "with-special-characters",
  toFile: "write-to-file",
};

interface InquirerResponse {
  options: string[];
  length: number;
}

const buildReference = (options: string[]): string => {
  let reference = "abcdefghijklmnopqrstuvwxyz";

  if (options.indexOf(PASSWORD_CUSTOMIZATION_OPTIONS.num) > -1) {
    reference += "0123456789";
  }

  if (options.indexOf(PASSWORD_CUSTOMIZATION_OPTIONS.upper) > -1) {
    reference += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (options.indexOf(PASSWORD_CUSTOMIZATION_OPTIONS.special) > -1) {
    reference += "!\"#$%'&()*+,-./:;<=>?@[]^_`{|}~";
  }

  return reference;
};

(async () => {
  const { options, length }: InquirerResponse = await inquirer.prompt([
    {
      type: "checkbox",
      message: "Password customization:",
      name: "options",
      choices: Object.values(PASSWORD_CUSTOMIZATION_OPTIONS),
    },
    {
      type: "number",
      message: "Minimum length:",
      name: "length",
      default: 12,
    },
  ]);

  const reference = buildReference(options);

  let password = "";

  for (
    let i = 0;
    i < length + Math.round(Math.random() * EXTRA_LENGTH_FACTOR);
    i++
  ) {
    password += reference[Math.round(Math.random() * (reference.length - 1))];
  }

  // write password to file
  if (options.indexOf(PASSWORD_CUSTOMIZATION_OPTIONS.toFile) > -1) {
    const { path } = await inquirer.prompt([
      {
        type: "input",
        default: "",
        name: "path",
        message: "Destination file path:",
      },
    ]);

    appendFileSync(path, `\n${password}`);
  }

  console.log(password);
  await write(password);
  console.log("\x1b[36mPassword copied to clipboard!");
})();
