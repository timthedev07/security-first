#!/usr/bin/env node

// import fs from "fs";
import inquirer from "inquirer";

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
  let reference = "";

  if (options.indexOf(PASSWORD_CUSTOMIZATION_OPTIONS.num)) {
    reference += "0123456789";
  }

  if (options.indexOf(PASSWORD_CUSTOMIZATION_OPTIONS.upper)) {
    reference += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (options.indexOf(PASSWORD_CUSTOMIZATION_OPTIONS.special)) {
    reference += "!\"#$%'&()*+,-./:;<=>?@[]^_`{|}~";
  }

  return reference;
};

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

  const reference = buildReference(options);

  let res = "";

  for (
    let i = 0;
    i < length + Math.round(Math.random() * EXTRA_LENGTH_FACTOR);
    i++
  ) {
    res += reference[Math.random() * (reference.length - 1)];
  }

  console.log(res);

  // write password to file
  if (options.indexOf(PASSWORD_CUSTOMIZATION_OPTIONS.toFile)) {
  }
})();
