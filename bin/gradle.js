#! /usr/bin/env node
var sh = require('shelljs');
var fs = require('fs');
var colorsTerminal = require('colors');

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
  'react-native-image-crop-picker': [
    'jitpack.io'
  ],
  'react-native-camera': [
    'react-native-camera',
    'jitpack.io'
  ]
}

const applyPluginGlobal = {
  "googleService": "apply plugin: 'com.google.gms.google-services'",
  "fabric": "apply plugin: 'io.fabric'",
}
const defaultConfig = {
  'default': `
        multiDexEnabled true
        vectorDrawables.useSupportLibrary = true
        ndk {
          abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86' ,'x86_64'
        }
  `,
  'react-native-camera': `missingDimensionStrategy 'react-native-camera', 'general'`,
}

const variantOutputsAll = (projectName) => `
        variant.outputs.all { output ->
          def project = "${projectName}"
          def SEP = "_"
          def buildType = variant.variantData.variantConfiguration.buildType.name
          def version = variant.versionName
          def versionCode = variant.versionCode
          def date = new Date();
          def formattedDate = date.format('ddMMyy_HHmm')

          def newApkName = project + SEP + buildType + SEP + version + SEP + versionCode + SEP + formattedDate + ".apk"

          outputFileName = new File(newApkName)
        }
`

const dependenciesGlobal = {
  "googleService": `implementation "com.google.android.gms:play-services-base:16.1.0"`,
  "firebase-core": `implementation 'me.leolin:ShortcutBadger:1.1.+@aar'\nimplementation "com.google.firebase:firebase-core:16.0.9"`,
  "firebase-messaging": `implementation "com.google.firebase:firebase-messaging:18.0.0"`,
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
        googlePlayServicesLocationVersion = "16.0.0"
        googlePlayServicesVersion = "16.0.0"
        googlePlayServicesVisionVersion = "17.0.2"
        reactNativeVersion = "+"
        androidMapsUtilsVersion = "0.5+"`,
}
const containerRepositories = {
  'fabric': "maven { url 'https://maven.fabric.io/public' }",
}
const allProjectsRepositories = {
  'jitpack.io': 'maven { url "https://jitpack.io" }'
}
class BuildGradleForApp {
  constructor(appName = '', sourceString = '', libsReactNativeExtends = 'npm install --save') {
    const listLibs = libsReactNativeExtends.replace('npm install --save', '').trim().split(' ');
    this.appName = appName;
    this.sourceString = sourceString;
    this.apply = '';
    this.dependencies = '';
    this.defaultConfig = '';
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
          if (defaultConfig[valuePlugin] !== undefined) {
            this.defaultConfig += `    ${defaultConfig[valuePlugin]}\n`;
            delete defaultConfig[valuePlugin];
          }
        })
      }
    });
  }

  generateBuildGradleRoot() {
    var resApplyPluginContent = this.sourceString.match(/^apply plugin: \"com.android.application\"/g)[0];
    var resDefaultConfig = this.sourceString.match(/(?<=(defaultConfig {))(.*\n?)+?(?=(\s*}))/g)[0];
    var resDependenciesContent = this.sourceString.match(/(?<=(dependencies {))(.*\n?)+?(?=(\s*}))/g)[0];
    var resApplicationVariants = this.sourceString.match(/(?<=(applicationVariants\.all { variant ->))(.*\n?)+?(?=(\s*}\n}))/g)[0];
    var replaceString = this.sourceString;
    replaceString = replaceString.replace(resApplyPluginContent, resApplyPluginContent + this.apply);
    replaceString = replaceString.replace(resDefaultConfig, resDefaultConfig + defaultConfig['default'] + this.defaultConfig);
    replaceString = replaceString.replace(resDependenciesContent, resDependenciesContent + this.dependencies);
    replaceString = replaceString.replace(resApplicationVariants, resApplicationVariants + variantOutputsAll(this.appName));

    return replaceString;
  }
}

class BuildGradle {
  constructor(appName = '', sourceString = '', libsReactNativeExtends = 'npm install --save') {
    const listLibs = libsReactNativeExtends.replace('npm install --save', '').trim().split(' ');
    this.appName = appName;
    this.sourceString = sourceString;
    this.ext = '';
    this.repositories = '';
    this.dependencies = '';
    this.allProjectsRepositories = '';
    listLibs.forEach((value) => {
      var pluginLib = libs[value];
      if (pluginLib !== undefined) {
        pluginLib.forEach(valuePlugin => {
          if (containerExt[valuePlugin] !== undefined) {
            this.ext += `        ${containerExt[valuePlugin]}\n`;
            delete containerExt[valuePlugin];
          }
          if (containerRepositories[valuePlugin] !== undefined) {
            this.repositories += `        ${containerRepositories[valuePlugin]}\n`;
            delete containerRepositories[valuePlugin];
          }
          if (containerDependenciesClassPath[valuePlugin] !== undefined) {
            this.dependencies += `        ${containerDependenciesClassPath[valuePlugin]}\n`;
            delete containerDependenciesClassPath[valuePlugin];
          }
          if (allProjectsRepositories[valuePlugin] !== undefined) {
            this.allProjectsRepositories += `        ${allProjectsRepositories[valuePlugin]}\n`;
            delete allProjectsRepositories[valuePlugin];
          }
        })
      }
    });
  }

  generateBuildGradleRoot() {
    var buildScript = this.sourceString.match(/(?<=(buildscript {))(.*\n?)+?(?=(}))/g)[0];
    var allProjects = this.sourceString.match(/(?<=(allprojects {))(.*\n?)+?(?=(}))/g)[0];

    var resExtContent = buildScript.match(/(?<=(ext {))(.*\n?)+?(?=(\s+}))/g)[0];
    var resRepositoriesBuildScriptContent = buildScript.match(/(?<=(repositories {))(.*\n?)+?(?=(\s+}))/g)[0];
    var resDependenciesContent = buildScript.match(/(?<=(dependencies {))(.*\n?)+?(?=(\s+\/\/|\s+}))/g)[0];

    var resRepositoriesAllProjectsContent = allProjects.match(/(?<=(repositories {))(.*\n?)+?(?=(}))/g)[0];

    var replaceBuildScriptString = buildScript;
    var replaceAllProjectsString = allProjects;
    var replaceString = this.sourceString;

    replaceBuildScriptString = replaceBuildScriptString.replace(resExtContent, resExtContent + this.ext);
    replaceBuildScriptString = replaceBuildScriptString.replace(resRepositoriesBuildScriptContent, resRepositoriesBuildScriptContent + this.repositories);
    replaceBuildScriptString = replaceBuildScriptString.replace(resDependenciesContent, resDependenciesContent + this.dependencies);

    replaceAllProjectsString = replaceAllProjectsString.replace(resRepositoriesAllProjectsContent, resRepositoriesAllProjectsContent + this.allProjectsRepositories);

    replaceString = replaceString.replace(buildScript, replaceBuildScriptString);
    replaceString = replaceString.replace(allProjects, replaceAllProjectsString);

    return replaceString;
  }
}

async function generateBuildGradleForApp(appName, pathProject, libsReactNativeExtends) {
  console.log(colorsTerminal.green('/android/app/build.gradle'));
  let data = fs.readFileSync(`${pathProject}/android/app/build.gradle`, { encoding: `utf-8`, flag: 'r' });
  fs.writeFileSync(pathProject + '/android/app/build.gradle', new BuildGradleForApp(appName, data, libsReactNativeExtends).generateBuildGradleRoot());
}

async function generateBuildGradle(appName, pathProject, libsReactNativeExtends) {
  console.log(colorsTerminal.green('/android/build.gradle'));
  let data = fs.readFileSync(`${pathProject}/android/build.gradle`, { encoding: `utf-8`, flag: 'r' });
  fs.writeFileSync(pathProject + '/android/build.gradle', new BuildGradle(appName, data, libsReactNativeExtends).generateBuildGradleRoot());
}

async function generateGradleProperties(pathProject) {
  console.log(colorsTerminal.green('/android/gradle.properties'));
  fs.appendFileSync(pathProject + '/android/gradle.properties', 'android.useAndroidX=true\nandroid.enableJetifier=true');
}

// generateBuildGradleForApp('test', sh.pwd().stdout + '/test', 'npm install --save react-native-webview abortcontroller-polyfill react-native-popup-dialog react-native-gesture-handler accounting moment react-native-extra-dimensions-android react-native-iphone-x-helper react-native-linear-gradient react-navigation react-redux redux react-native-maps react-native-firebase ')

// generateBuildGradle('test', sh.pwd().stdout + '/test', 'npm install --save react-native-webview abortcontroller-polyfill react-native-popup-dialog react-native-gesture-handler accounting moment react-native-extra-dimensions-android react-native-iphone-x-helper react-native-linear-gradient react-navigation react-redux redux react-native-maps react-native-firebase ')
module.exports = {
  generateBuildGradleForApp,
  generateGradleProperties,
  generateBuildGradle,
}