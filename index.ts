#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(
  chalk.italic.underline.yellowBright(
    '\n\t\t"LET SET THE COUNTDOWN TIMER FOR EVENTS"\n'
  )
);

const userTime = await inquirer.prompt([
  {
    message: "Set your timer: ",
    name: "timer",
    type: "list",
    choices: ["Minutes", "Seconds"],
  },
  {
    message: "Enter your event time (only in numbers): ",
    name: "time",
    type: "input",
    validate: (input: string) =>
      !isNaN(Number(input)) && Number(input) > 0
        ? true
        : "Please enter a valid number",
  },
  {
    message:
      "Write a message or something special you would like to highlight at the end of an interval? ",
    name: "message",
    type: "input",
  },
  {
    message: "How many times you want to repeat your message?",
    name: "repeat",
    type: "input",
    validate: (input: string) =>
      !isNaN(Number(input)) && Number(input) > 0
        ? true
        : "Please enter a valid positive integer",
  },
]);

let conversion =
  userTime.timer === "Minutes"
    ? userTime.time * 60 * 1000
    : userTime.time * 1000;
let num = 0;

function message() {
  num++;
  console.log(
    chalk.bold.underline.yellowBright(`\n\t ***${userTime.message}*** `)
  );
  if (num >= userTime.repeat) {
    clearInterval(interval);
  }
}

const interval = setInterval(message, conversion);
