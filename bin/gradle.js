#! /usr/bin/env node
var fs = require('fs');
var g2js = require('gradle-to-js/lib/parser');

const containerDependenciesClassPath = {
  'root': { "group": "com.android.tools.build", "name": "gradle", "version": "3.4.0", "type": "classpath", "excludes": [] },
  'googleService': { "group": "com.google.gms", "name": "google-services", "version": "4.2.0", "type": "classpath", "excludes": [] },
  'fabric': { "group": "io.fabric.tools", "name": "gradle", "version": "1.29.0", "type": "classpath", "excludes": [] },
}
const containerExt = {
  'maps': {
    "minSdkVersion": 20,
    "googlePlayServicesLocationVersion": "16.0.0",
    "googlePlayServicesVersion": "16.0.0",
    "googlePlayServicesVisionVersion": "17.0.2",
    "reactNativeVersion": "+",
    "androidMapsUtilsVersion": "0.5+"
  },
}
const containerRepositories = {
  'react-native': { "type": "maven", "data": { "url": "$rootDir/../node_modules/react-native/android" } },
  'fabric': { "type": "maven", "data": { "url": "https://maven.fabric.io/public" } },
  'google': { "type": "unknown", "data": { "name": "google()" } },
  'jcenter': { "type": "unknown", "data": { "name": "jcenter()" } },
  'mavenLocal': { "type": "unknown", "data": { "name": "mavenLocal()" } },
}

class Dependencies {
  constructor(jsonObject = null, extendsGradle) {
    if (jsonObject === null) {
      this.dependencies = [containerDependenciesClassPath['root']];
      this.extendsGradle = extendsGradle;
    } else {
      this.dependencies = jsonObject;
      this.extendsGradle = extendsGradle;
    }
  }

  static getInstanceBuildScript(jsonObject = null, extendsGradle) {
    return new Dependencies(jsonObject, extendsGradle);
  }

  toString() {
    let temp = '';
    this.dependencies.forEach((value) => temp += `${value.type} '${value.group}:${value.name}:${value.version}' \n\t`);
    if (this.extendsGradle !== null || this.extendsGradle !== undefined) {
      this.extendsGradle.forEach((value) => temp += `${value.type} '${value.group}:${value.name}:${value.version}' \n\t`);
    }
    return `dependencies {
        ${temp}

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
      }`
  }
}

class Repositories {

  constructor(repositories) {
    this.repositories = repositories;
  }

  static getInstanceBuildScript(repositories = null) {
    if (repositories === null) {
      return new Repositories([containerRepositories['google'], containerRepositories['jcenter']]);
    } else {
      return new Repositories(repositories);
    }
  }
  static getInstanceAllProjects(repositories = null) {
    if (repositories === null) {
      return new Repositories([
        containerRepositories['mavenLocal'],
        containerRepositories['google'],
        containerRepositories['jcenter'],
        containerRepositories['react-native'],]);
    } else {
      return new Repositories(repositories);
    }
  }

  toString() {
    let temp = '';
    this.repositories.forEach((value) => {
      if (value.type === 'unknown') {
        temp += `${value.data.name}\n\t`;
      } else if (value.type === 'maven') {
        temp += `${value.type} {\n\t\turl "${value.data.url}"\n\t}`;
      }
    });
    return `repositories {
        ${temp}
      }`
  }
}

class Ext {
  constructor(jsonObject = null, extendsGradle) {
    this.jsonObject = jsonObject;
    this.extendsGradle = extendsGradle;
  }
  toString() {
    let temp = '';
    const mergeObject = { ...this.jsonObject, ...this.extendsGradle };
    Object.keys(mergeObject).forEach((key) => {
      let value = mergeObject[key];
      if (isNaN(Number(value))) {
        value = `"${value}"`
      }
      temp += (key + ' = ' + value + '\n\t');
    });
    return `ext {
        ${temp}
      }`
  }
}

class BuildScript {
  constructor(jsonObject = null, extendsGradle) {
    if (jsonObject === null) {
      this.ext = new Ext();
      this.repositories = Repositories.getInstanceBuildScript();
      this.dependencies = Dependencies.getInstanceBuildScript();
    } else {
      this.ext = new Ext(jsonObject['ext'], extendsGradle['ext']);
      this.repositories = Repositories.getInstanceBuildScript(jsonObject['repositories']);
      this.dependencies = Dependencies.getInstanceBuildScript(jsonObject['dependencies'], extendsGradle['dependencies']);
    }
  }

  toString() {
    return `buildscript {
      ${this.ext.toString()}
      ${this.repositories.toString()}
      ${this.dependencies.toString()}
    }`
  }
}

class AllProjects {
  constructor(jsonObject = null) {
    if (jsonObject === null) {
      this.repositories = Repositories.getInstanceAllProjects();
    } else {
      this.repositories = Repositories.getInstanceAllProjects(jsonObject['repositories']);
    }
  }

  toString() {
    return `allprojects {
      ${this.repositories.toString()}
    }`
  }
}
let extendsGradle = {
  'buildscript': { 'ext': {}, 'dependencies': [] },
}
class BuildGradle {
  constructor(jsonObject = null, libsReactNativeExtends = 'npm install --save') {
    const listLibs = libsReactNativeExtends.replace('npm install --save', '').split(' ');
    listLibs.forEach((value) => {
      if (
        value === 'react-native-firebase' ||
        value === 'react-native-maps'
      ) {
        if (containerDependenciesClassPath['googleService'] !== undefined) {
          extendsGradle.buildscript.dependencies.push(containerDependenciesClassPath['googleService']);
          delete containerDependenciesClassPath['googleService'];
        }
      }
      if (value === 'react-native-maps') {
        extendsGradle.buildscript.ext = { ...containerExt['maps'] };
      }
    })
    if (jsonObject === null) {
      this.buildscript = new BuildScript();
      this.allprojects = new AllProjects();
    } else {
      this.buildscript = new BuildScript(jsonObject['buildscript'], extendsGradle['buildscript']);
      this.allprojects = new AllProjects(jsonObject['allprojects']);
    }
  }

  generateBuildGradleRoot() {
    return `// Top-level build file where you can add configuration options common to all sub-projects/modules.
    ${this.buildscript.toString()}

    ${this.allprojects.toString()}
    `
  }
}

async function generateBuildGradle(pathProject, libsReactNativeExtends) {
  g2js.parseFile(pathProject + '/android/build.gradle').then(function (representation) {
    fs.writeFileSync(pathProject + '/android/build.gradle', new BuildGradle(representation, libsReactNativeExtends).generateBuildGradleRoot());
  });
}

module.exports = {
  generateBuildGradle
}