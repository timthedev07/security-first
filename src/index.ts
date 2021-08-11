#!/usr/bin/env node

// import fs from "fs";
import inquirer, { Inquirer } from "inquirer";

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

const buildReference = (options: string[]) => {};

(async () => {
  const { options, length }: InquirerResponse = await inquirer.prompt([
    {
      type: "checkbox",
      message: "Customize password:",
      name: "option",
      choices: Object.values(PASSWORD_CUSTOMIZATION_OPTIONS),
    },
    {
      type: "number",
      message: "Minimum length:",
      name: "length",
      default: 12,
    },
  ]);

  // write password to file
  if (options.indexOf(PASSWORD_CUSTOMIZATION_OPTIONS.toFile)) {
  }
})();
