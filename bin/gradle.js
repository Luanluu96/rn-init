var fs = require('fs');

const containerDependenciesClassPath = {
  root: `classpath("com.android.tools.build:gradle:3.4.0")`,
  googleService: `classpath 'com.google.gms:google-services:4.2.0'`,
  fabric: `classpath 'io.fabric.tools:gradle:1.29.0'`,
}

const containerRepositories = {
  fabric: `maven { url 'https://maven.fabric.io/public' }`,
  google: `google()`,
  jcenter: `jcenter()`,
  mavenLocal: `mavenLocal()`
}

class Dependencies {
  constructor(dependencies = []) {
    this.dependencies = dependencies;
  }

  static getInstanceBuildScript(){
    return new Dependencies(['root']);
  }

  toString() {
    let temp = '';
    this.dependencies.forEach((value) => temp += containerDependenciesClassPath[value] + '\n\t');
    return `dependencies {
        ${temp}

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
      }`
  }
}

class Repositories {

  constructor(repositories = ['google', 'jcenter']) {
    this.repositories = repositories;
  }

  static getInstanceBuildScript(){
    return new Repositories();
  }
  static getInstanceAllProjects(){
    return new Repositories(['mavenLocal','google', 'jcenter']);
  }

  toString() {
    let temp = '';
    this.repositories.forEach((value) => temp += containerRepositories[value] + '\n\t');
    return `repositories {
        ${temp}
      }`
  }
}

class Ext {

  toString() {
    return `ext {
        buildToolsVersion = "28.0.3"
        minSdkVersion = 16
        compileSdkVersion = 28
        targetSdkVersion = 28
        supportLibVersion = "28.0.0"
      }`
  }
}

class BuildScript {
  constructor() {
    this.ext = new Ext();
    this.repositories = Repositories.getInstanceBuildScript();
    this.dependencies = Dependencies.getInstanceBuildScript();
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
  constructor() {
    this.repositories = Repositories.getInstanceAllProjects();
  }

  toString() {
    return `allprojects {
      ${this.repositories.toString()}
    }`
  }
}

class BuildGradle {
  constructor() {
    this.buildscript = new BuildScript();
    this.allprojects = new AllProjects();
  }

  generateBuildGradleRoot() {
    return `// Top-level build file where you can add configuration options common to all sub-projects/modules.
    ${this.buildscript.toString()}

    ${this.allprojects.toString()}
    `
  }

  // static generateBuildGradleApp() {
  //   return `// Top-level build file where you can add configuration options common to all sub-projects/modules.
  //     ${this.buildscript.toString()}

  //     ${this.allprojects.toString()}
  //   `
  // }
}


// console.log(new BuildGradle().generateBuildGradleRoot())
let data = fs.readFileSync(`/Users/neos/Desktop/rn-init/test/android/build.gradle`, {encoding: `utf-8`, flag: 'r'});
console.log(data)