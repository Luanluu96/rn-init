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
} = require('./defined')';

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
  packageJson = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
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
  fs.mkdirSync(path.resolve('src'), { recursive: true })
} catch (err) {
  console.warn(err)
}
console.log("======================== assets ========================");
// assets
try {
  fs.mkdirSync(path.resolve('src'), { recursive: true })
} catch (err) {
  console.warn(err)
}
try {
  fs.mkdirSync(path.resolve('src/assets'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/assets/fonts'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/assets/icons'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/assets/images'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/assets/data'), { recursive: true })
} catch (error) {
  console.warn(error)
}

try {
  fs.writeFileSync(path.resolve('src/assets/icons/index.js'), indexIcons)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/assets/images/index.js'), indexImages)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/assets/index.js'), indexAssets)
} catch (error) {
  console.warn(error)
}

console.log("======================== common ========================");
// common
try {
  fs.mkdirSync(path.resolve('src/common'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/common/components'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/common/components/Button'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/common/components/Header'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/common/components/List'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/common/components/Button/index.js'), buttonComponents)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/common/components/Header/index.js'), headerComponents)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/common/components/List/index.js'), listComponents)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/common/components/index.js'), indexComponents)
} catch (error) {
  console.warn(error)
}

console.log("======================== containers ========================");
// containers
try {
  fs.mkdirSync(path.resolve('src/containers'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/containers/HomePage'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/containers/HomePage/index.js'), indexHomePage)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/containers/HomePage/styles.js'), stylesHomePage)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/containers/index.js'), indexContainers)
} catch (error) {
  console.warn(error)
}

console.log("======================== configs ========================");
// configs
try {
  fs.mkdirSync(path.resolve('src/configs'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/configs/Animations.js'), configAnimations)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/configs/index.js'), indexConfigs)
} catch (error) {
  console.warn(error)
}

console.log("======================== stores ========================");
// stores
try {
  fs.mkdirSync(path.resolve('src/stores'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/stores/actions'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/stores/reducers'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.mkdirSync(path.resolve('src/stores/sagas'), { recursive: true })
} catch (error) {
  console.warn(error)
}

try {
  fs.writeFileSync(path.resolve('src/stores/reducers/init.js'), initReducers)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/stores/reducers/index.js'), indexReducers)
} catch (error) {
  console.warn(error)
}

try {
  fs.writeFileSync(path.resolve('src/stores/sagas/init.js'), initSagas)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/stores/sagas/index.js'), indexSagas)
} catch (error) {
  console.warn(error)
}

try {
  fs.writeFileSync(path.resolve('src/stores/index.js'), indexStores)
} catch (error) {
  console.warn(error)
}


console.log("======================== routers ========================");
// routers
try {
  fs.mkdirSync(path.resolve('src/routers'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/routers/index.js'), indexRouter)
} catch (error) {
  console.warn(error)
}

console.log("======================== utils ========================");
// utils
try {
  fs.mkdirSync(path.resolve('src/utils'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/utils/index.js'), indexUtils)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/utils/styles.js'), styles)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/utils/colors.js'), colors)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/utils/strings.js'), strings)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/utils/constants.js'), constants)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/utils/functions.js'), functions)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/utils/fetchs.js'), fetchs)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/utils/asyncStorage.js'), asyncStorage)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/utils/types.js'), types)
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('src/utils/package.json'), JSON.stringify({ name: '@utils' }))
} catch (error) {
  console.warn(error)
}

console.log("======================== debugging ========================");
// debugging
try {
  fs.mkdirSync(path.resolve('debugging'), { recursive: true })
} catch (error) {
  console.warn(error)
}
try {
  fs.writeFileSync(path.resolve('debugging/ReactotronConfig.js'), ReactotronConfig)
} catch (error) {
  console.warn(error)
}

console.log("======================== App ========================");
// App
try {
  fs.writeFileSync(path.resolve('src/App.js'), appRoot)
} catch (error) {
  console.warn(error)
}

console.log("======================== delete ========================");
// delete
try {
  fs.unlinkSync(path.resolve('App.js'))
} catch (err) {
  console.warn(err)
}
rmdirAsync(path.resolve('ios/' + projectName + '-tvOS'))
rmdirAsync(path.resolve('ios/' + projectName + '-tvOSTests'))
rmdirAsync(path.resolve('ios/' + projectName + 'Tests'))

console.log("======================== root app ========================");
// root app
try {
  fs.writeFileSync(path.resolve('index.js'), indexApp)
} catch (error) {
  console.warn(error)
}

console.log("======================== update package.json ========================");
// update package.json
try {
  fs.writeFileSync(path.resolve('package.json'), JSON.stringify(packageJson))
} catch (error) {
  console.warn(error)
}

sh.exec('npm install && react-native link');

sh.rm("package-lock.json");
console.log("done!");