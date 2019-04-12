var sh = require('shelljs');
var path = require('path');
var fs = require('fs');

const {
  indexIcons,
  indexImages,
  indexAssets,
  buttonComponents,
  headerComponents,
  listComponents,
  indexComponents,
  indexHomePage,
  stylesHomePage,
  indexContainers,
  configAnimations,
  indexConfigs,
  initReducers,
  indexReducers,
  initSagas,
  indexSagas,
  indexStores,
  indexRouter,
  indexUtils,
  styles,
  colors,
  strings,
  constants,
  functions,
  fetchs,
  asyncStorage,
  types,
  ReactotronConfig,
  appRoot,
  indexApp
} = require('./defined');

const { rmdirAsync } = require('./functions')

const name = process.argv.slice(-1)[0];

if (sh.which('expo')) {
  sh.echo('Sorry, this script not support expo');
  sh.exit(1);
}

sh.exec(`react-native init ${name}`);
sh.cd(name);

// edit root package.json

var packageJson = {}
try {
  packageJson = JSON.parse(fs.readFileSync(sh.pwd().stdout + "/" +('package.json'), 'utf8'));
} catch (err) {
  console.error(err);
}
console.log("======================== Init ========================");
console.log("======================== package.json ========================");
var projectName = packageJson['name'];
// scripts
packageJson['scripts']['start'] = 'node node_modules/react-native/local-cli/cli.js start';
packageJson['scripts']['restart'] = 'node node_modules/react-native/local-cli/cli.js start --reset-cache';
packageJson['scripts']['build-android'] = 'react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res';
packageJson['scripts']['build-ios'] = 'react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/' + projectName + '/main.jsbundle --assets-dest ios --dev=false';
packageJson['scripts']['coverage'] = 'npm test -- --coverage';
packageJson['scripts']['android'] = 'node node_modules/react-native/local-cli/cli.js run-android';
packageJson['scripts']['sync-android'] = 'cd android && ./gradlew clean && cd ..';
packageJson['scripts']['ios'] = 'node node_modules/react-native/local-cli/cli.js run-ios';
packageJson['scripts']['SE'] = "node node_modules/react-native/local-cli/cli.js run-ios --simulator='iPhone SE'";
packageJson['scripts']['test'] = 'jest';
packageJson['scripts']['reload'] = "adb shell input text 'rr'";
packageJson['scripts']['toggle'] = 'adb shell input keyevent 82';
packageJson['scripts']['build-release-android'] = 'rm -rf android/app/src/main/res/drawable-xxxhdpi android/app/src/main/res/drawable-xxhdpi android/app/src/main/res/drawable-xhdpi android/app/src/main/res/drawable-mdpi android/app/src/main/res/drawable-hdpi && cd android && ./gradlew assembleRelease';
packageJson['scripts']['lint'] = 'eslint .';

// dependencies
packageJson['dependencies']['@redux-saga/is'] = '^1.0.2';
packageJson['dependencies']['abortcontroller-polyfill'] = '^1.2.1';
packageJson['dependencies']['accounting'] = '^0.4.1';
packageJson['dependencies']['moment'] = '^2.22.2';
packageJson['dependencies']['react-native-extra-dimensions-android'] = '^1.2.1';
packageJson['dependencies']['react-native-gesture-handler'] = '^1.1.0';
packageJson['dependencies']['react-native-iphone-x-helper'] = '^1.2.0';
packageJson['dependencies']['react-native-linear-gradient'] = '^2.5.3';
packageJson['dependencies']['react-navigation'] = '^3.3.2';
packageJson['dependencies']['react-redux'] = '^6.0.1';
packageJson['dependencies']['redux'] = '^4.0.0';
packageJson['dependencies']['redux-saga'] = '^1.0.2';

// devDependencies 
packageJson['devDependencies']['reactotron-react-native'] = '^2.1.0';
packageJson['devDependencies']['reactotron-redux'] = '^2.1.0';
packageJson['devDependencies']['reactotron-redux-saga'] = '^4.0.1';

console.log("======================== Root src ========================");
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src'), { recursive: true })
} catch (err) {
  console.warn(err)
}
console.log("======================== assets ========================");
// assets
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src'), { recursive: true })
} catch (err) {
  console.warn(err)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/assets'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/assets/fonts'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/assets/icons'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/assets/images'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/assets/data'), { recursive: true })
} catch (error) {
  console.warn(error)
}

try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/assets/icons/index.js'), indexIcons)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/assets/images/index.js'), indexImages)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/assets/index.js'), indexAssets)
} catch (error) {
  console.warn(error)
}

console.log("======================== common ========================");
// common
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/common'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/common/components'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/common/components/Button'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/common/components/Header'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/common/components/List'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/common/components/Button/index.js'), buttonComponents)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/common/components/Header/index.js'), headerComponents)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/common/components/List/index.js'), listComponents)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/common/components/index.js'), indexComponents)
} catch (error) {
  console.warn(error)
}

console.log("======================== containers ========================");
// containers
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/containers'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/containers/HomePage'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/containers/HomePage/index.js'), indexHomePage)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/containers/HomePage/styles.js'), stylesHomePage)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/containers/index.js'), indexContainers)
} catch (error) {
  console.warn(error)
}

console.log("======================== configs ========================");
// configs
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/configs'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/configs/Animations.js'), configAnimations)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/configs/index.js'), indexConfigs)
} catch (error) {
  console.warn(error)
}

console.log("======================== stores ========================");
// stores
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/stores'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/stores/actions'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/stores/reducers'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/stores/sagas'), { recursive: true })
} catch (error) {
  console.warn(error)
}

try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/stores/reducers/init.js'), initReducers)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/stores/reducers/index.js'), indexReducers)
} catch (error) {
  console.warn(error)
}

try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/stores/sagas/init.js'), initSagas)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/stores/sagas/index.js'), indexSagas)
} catch (error) {
  console.warn(error)
}

try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/stores/index.js'), indexStores)
} catch (error) {
  console.warn(error)
}


console.log("======================== routers ========================");
// routers
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/routers'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/routers/index.js'), indexRouter)
} catch (error) {
  console.warn(error)
}

console.log("======================== utils ========================");
// utils
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('src/utils'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/utils/index.js'), indexUtils)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/utils/styles.js'), styles)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/utils/colors.js'), colors)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/utils/strings.js'), strings)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/utils/constants.js'), constants)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/utils/functions.js'), functions)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/utils/fetchs.js'), fetchs)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/utils/asyncStorage.js'), asyncStorage)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/utils/types.js'), types)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/utils/package.json'), JSON.stringify({ name: '@utils' }))
} catch (error) {
  console.warn(error)
}

console.log("======================== debugging ========================");
// debugging
try {
  fs.mkdirSync(sh.pwd().stdout + "/" +('debugging'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('debugging/ReactotronConfig.js'), ReactotronConfig)
} catch (error) {
  console.warn(error)
}

console.log("======================== App ========================");
// App
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('src/App.js'), appRoot)
} catch (error) {
  console.warn(error)
}

console.log("======================== delete ========================");
// delete
try {
  fs.unlinkSync(sh.pwd().stdout + "/" +('App.js'))
} catch (err) {
  console.warn(err)
}
rmdirAsync(sh.pwd().stdout + "/" +('ios/' + projectName + '-tvOS'))
rmdirAsync(sh.pwd().stdout + "/" +('ios/' + projectName + '-tvOSTests'))
rmdirAsync(sh.pwd().stdout + "/" +('ios/' + projectName + 'Tests'))

console.log("======================== root app ========================");
// root app
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('index.js'), indexApp)
} catch (error) {
  console.warn(error)
}

console.log("======================== update package.json ========================");
// update package.json
try {
  fs.writeFileSync(sh.pwd().stdout + "/" +('package.json'), JSON.stringify(packageJson))
} catch (error) {
  console.warn(error)
}

sh.exec('npm install && react-native link');

sh.rm("package-lock.json");
console.log("done!");