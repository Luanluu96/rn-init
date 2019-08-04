#! /usr/bin/env node
var sh = require('shelljs');
var fs = require('fs');

const libs = {
  'react-native-firebase': [
    'googleService',
    'firebase-core',
    'firebase-messaging',
    'ShortcutBadger',
    'fabric',
  ],
  'react-native-maps': [
    'googleService',
    'play-services-maps',
    'play-services-location',
  ],
}

const applyPluginGlobal = {
  "googleService": "apply plugin: 'com.google.gms.google-services'",
  "fabric": "apply plugin: 'io.fabric'",
}
const dependenciesGlobal = {
  "googleService": `implementation "com.google.android.gms:play-services-base:16.1.0"`,
  "firebase-core": `implementation "com.google.firebase:firebase-core:16.0.8"`,
  "firebase-messaging": `implementation "com.google.firebase:firebase-messaging:17.3.4"`,
  "firebase-core": `implementation 'me.leolin:ShortcutBadger:1.1.+@aar'`,
  "play-services-maps": `implementation 'com.google.android.gms:play-services-maps:10.0.1'`,
  "fabric": `implementation 'com.crashlytics.sdk.android:crashlytics:2.10.0'`,
  "fabric": `implementation 'com.google.firebase:firebase-crash:16.2.1'`,
}

const containerDependenciesClassPath = {
  'googleService': "classpath 'com.google.gms:google-services:4.2.0'",
  'fabric': "classpath 'io.fabric.tools:gradle:1.29.0'",
}
const containerExt = {
  'play-services-maps': `
    minSdkVersion = 20
    googlePlayServicesLocationVersion = "16.0.0"
    googlePlayServicesVersion = "16.0.0"
    googlePlayServicesVisionVersion = "17.0.2"
    reactNativeVersion = "+"
    androidMapsUtilsVersion = "0.5+"
  `,
}
const containerRepositories = {
  'fabric': "maven { url 'https://maven.fabric.io/public' }",
}
// g2js.parseFile(`${sh.pwd().stdout}/test/android/app/build.gradle`).then(function (representation) {

//   console.log(JSON.stringify(representation))
// });
class BuildGradleForApp {
  constructor(sourceString = '', libsReactNativeExtends = 'npm install --save') {
    const listLibs = libsReactNativeExtends.replace('npm install --save', '').split(' ');
    this.sourceString = sourceString;
    this.apply = '';
    this.dependencies = '';
    listLibs.forEach((value) => {
      var pluginLib = libs[value];
      if (pluginLib !== undefined) {
        pluginLib.forEach(valuePlugin => {
          if (applyPluginGlobal[valuePlugin] !== undefined) {
            this.apply += `\n${applyPluginGlobal[valuePlugin]}`;
            delete applyPluginGlobal[valuePlugin];
          }
          if (dependenciesGlobal[valuePlugin] !== undefined) {
            this.dependencies += `    ${dependenciesGlobal[valuePlugin]}\n`;
            delete dependenciesGlobal[valuePlugin];
          }
        })
      }
    });
  }

  generateBuildGradleRoot() {
    var resApplyPluginContent = this.sourceString.match(/^apply plugin: \"com.android.application\"/g);
    var resDependenciesContent = this.sourceString.match(/(?<=(dependencies {))(.*\n?)+?(?=(}))/g);
    var replaceString = this.sourceString;
    replaceString = replaceString.replace(resApplyPluginContent, resApplyPluginContent + this.apply);
    replaceString = replaceString.replace(resDependenciesContent, resDependenciesContent + this.dependencies);

    return replaceString;
  }
}

class BuildGradle {
  constructor(sourceString = '', libsReactNativeExtends = 'npm install --save') {
    const listLibs = libsReactNativeExtends.replace('npm install --save', '').split(' ');
    this.sourceString = sourceString;
    this.ext = '';
    this.dependencies = '';
    listLibs.forEach((value) => {
      var pluginLib = libs[value];
      if (pluginLib !== undefined) {
        pluginLib.forEach(valuePlugin => {
          if (containerExt[valuePlugin] !== undefined) {
            this.ext += `\n${containerExt[valuePlugin]}`;
            delete containerExt[valuePlugin];
          }
          if (containerRepositories[valuePlugin] !== undefined) {
            this.ext += `\n${containerRepositories[valuePlugin]}`;
            delete containerRepositories[valuePlugin];
          }
          if (containerDependenciesClassPath[valuePlugin] !== undefined) {
            this.dependencies += `    ${containerDependenciesClassPath[valuePlugin]}\n`;
            delete containerDependenciesClassPath[valuePlugin];
          }
        })
      }
    });
  }

  generateBuildGradleRoot() {
    var resExtContent = this.sourceString.match(/(?<=(ext {))(.*\n?)+?(?=(}))/g);
    var resRepositoriesContent = this.sourceString.match(/(?<=(repositories {))(.*\n?)+?(?=(}))/g);
    var resDependenciesContent = this.sourceString.match(/(?<=(dependencies {))(.*\n?)+?(?=(}))/g);
    var replaceString = this.sourceString;
    replaceString = replaceString.replace(resExtContent, resExtContent + this.ext);
    replaceString = replaceString.replace(resRepositoriesContent, resRepositoriesContent + this.re);
    replaceString = replaceString.replace(resDependenciesContent, resDependenciesContent + this.dependencies);

    return replaceString;
  }
}

// async function generateBuildGradleForApp(pathProject, libsReactNativeExtends) {
//   let data = fs.readFileSync(`${pathProject}/android/app/build.gradle`, { encoding: `utf-8`, flag: 'r' });
//   fs.writeFileSync(pathProject + '/android/app/build.gradle', new BuildGradleForApp(data, libsReactNativeExtends).generateBuildGradleRoot());
// }

async function generateBuildGradle(pathProject, libsReactNativeExtends) {
  let data = fs.readFileSync(`${pathProject}/android/build.gradle`, { encoding: `utf-8`, flag: 'r' });
  console.log(new BuildGradle(data, libsReactNativeExtends).generateBuildGradleRoot());
  // fs.writeFileSync(pathProject + '/android/build.gradle', new BuildGradle(data, libsReactNativeExtends).generateBuildGradleRoot());
}

generateBuildGradle(sh.pwd().stdout +'/test', 'npm install --save react-native-webview abortcontroller-polyfill react-native-popup-dialog react-native-gesture-handler accounting moment react-native-extra-dimensions-android react-native-iphone-x-helper react-native-linear-gradient react-navigation react-redux redux react-native-maps react-native-firebase ')
// export {
//   generateBuildGradleForApp,
// }