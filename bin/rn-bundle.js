#! /usr/bin/env node
var sh = require('shelljs');
var path = require('path');
var fs = require('fs');
var inquirer = require('inquirer');
var colorsTerminal = require('colors');

async function main() {
  if (!process.argv.slice(2).length) {
    return;
  }

  const newBundleId = process.argv.slice(2)[0];
  let link = sh.pwd().stdout + '/ios';

  if (process.argv.slice(2).length > 1) {
    link = process.argv.slice(2)[1] + '/ios';
  }

  const folderExist = fs.existsSync(link);

  if (!folderExist) {
    return;
  }
  const projectName = link.split('/').slice(-2)[0];
  sh.exec(`awk -F '=' '/PRODUCT_BUNDLE_IDENTIFIER/ {print $2 > "bundleId"; exit}' ${link}/${projectName}.xcodeproj/project.pbxproj`);
  let oldBundleId = sh.exec(`cat bundleId`);
  oldBundleId = oldBundleId.stdout.substring(oldBundleId.stdout.indexOf('"') + 1, oldBundleId.stdout.lastIndexOf('";'));

  sh.exec(`sed -i '' 's/${oldBundleId}/${newBundleId}/g' ${link}/${projectName}.xcodeproj/project.pbxproj`);
  sh.exec(`open  ${link}/${projectName}.xcodeproj`);
}
main();