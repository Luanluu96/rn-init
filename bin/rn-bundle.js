#! /usr/bin/env node
var sh = require('shelljs');
var path = require('path');
var fs = require('fs');
var inquirer = require('inquirer');
var colorsTerminal = require('colors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


async function main() {
  if (!process.argv.slice(2).length) return;

  const bundleId = process.argv.slice(2)[0];
  let link = sh.pwd().stdout;
  if (process.argv.slice(2).length > 1)
    link = process.argv.slice(2)[1];
  const folderExist = fs.existsSync(link + '/ios');
  if (folderExist) {
    
  }
}
main();