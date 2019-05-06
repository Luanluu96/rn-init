#! /usr/bin/env node
var sh = require('shelljs');
var path = require('path');
var fs = require('fs');
var readline = require('readline');
var inquirer = require('inquirer');
var colorsTerminal = require('colors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const { updatePackageJson } = require('./package');
const {
  indexIcons,
  indexImages,
  indexAssets,
  buttonComponents,
  headerComponents,
  lableComponents,
  listComponents,
  spinnerComponents,
  indexComponents,
  indexHomePage,
  stylesHomePage,
  indexContainers,
  configAnimations,
  indexConfigs,
  initReducers,
  networkAction,
  networkReducers,
  indexReducers,
  initSagas,
  indexSagas,
  indexStoresSaga,
  indexStoresThunk,
  indexRouter,
  indexUtils,
  styles,
  colors,
  strings,
  constants,
  functions,
  fetchs,
  asyncStorage,
  audioPlayer,
  networkTracker,
  types,
  ReactotronConfigSaga,
  ReactotronConfigThunk,
  appRoot,
  indexApp
} = require('./defined');

const { rmdirAsync } = require('./functions')


let ReactotronConfig = "";
let indexStores = "";
const name = process.argv.slice(-1)[0];

let installLibCommandLine = `npm install --save abortcontroller-polyfill@^1.2.1 react-native-gesture-handler accounting@^0.4.1 moment@^2.22.2 react-native-extra-dimensions-android@^1.2.1 react-native-iphone-x-helper@^1.2.0 react-native-linear-gradient@^2.5.3 react-navigation@^3.3.2 react-redux redux `
let installLibDevCommandLine = `npm install --save-dev reactotron-redux@^2.1.0 reactotron-react-native@^2.1.0 `
async function main() {

  sh.exec(`react-native init ${name}`);
  sh.cd(name);
  sh.exec('clear');
  sh.mkdir(sh.pwd().stdout + '/android/app/src/main/assets/')


  console.log(colorsTerminal.green('======================== Initalizing... ======================== '));
  //edit root package.json
  await inquirer
    .prompt({
      type: 'list',
      name: 'Redux Middleware?',
      choices: [
        "1.Redux-Thunk",
        "2.Redux-saga"
      ]
    })
    .then(answers => {
      if (answers['Redux Middleware?'] === "1.Redux-Thunk") {
        ReactotronConfig = ReactotronConfigThunk;
        indexStores = indexStoresThunk;
        installLibCommandLine += `redux-thunk `;
      } else {
        ReactotronConfig = ReactotronConfigSaga;
        indexStores = indexStoresSaga;
        installLibCommandLine += `redux-saga @redux-saga/is `
        installLibDevCommandLine += 'reactotron-redux-saga ';
      }
    });

  await inquirer
    .prompt({
      type: 'checkbox',
      name: 'Select libraries',
      choices: [
        "react-native-sound"
      ]
    })
    .then(libraries => {
      libraries['Select libraries'].forEach(lib => {
        installLibCommandLine += lib + ` `
      });
    });

  updatePackageJson(sh.pwd().stdout);
  console.log(colorsTerminal.green('"Intalling => linking libraries..."'));
  sh.exec(installLibCommandLine);
  sh.exec(installLibDevCommandLine);
  sh.exec('react-native link');

  console.log(colorsTerminal.green('[Source]'), "Root src");
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src'), { recursive: true })
  } catch (err) {
    console.warn(err)
  }
  console.log(colorsTerminal.green('[Source]'), "assets");
  // assets
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/assets'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/assets/fonts'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/assets/icons'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/assets/images'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/assets/data'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }

  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/assets/icons/index.js'), indexIcons)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/assets/images/index.js'), indexImages)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/assets/index.js'), indexAssets)
  } catch (error) {
    console.warn(error)
  }

  console.log(colorsTerminal.green('[Source]'), "api");
  // assets
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/api'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/api/index.js'), '');
  } catch (error) {
    console.warn(error)
  }

  console.log(colorsTerminal.green('[Source]'), "common");
  // common
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/common'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/common/components'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/common/components/Button'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/common/components/Header'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/common/components/Label'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/common/components/List'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/common/components/Spinner'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/Button/index.js'), buttonComponents)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/Header/index.js'), headerComponents)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/Label/index.js'), lableComponents)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/List/index.js'), listComponents)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/Spinner/index.js'), spinnerComponents)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/index.js'), indexComponents)
  } catch (error) {
    console.warn(error)
  }

  console.log(colorsTerminal.green('[Source]'), "containers");
  // containers
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/containers'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/containers/HomePage'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/containers/HomePage/index.js'), indexHomePage)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/containers/HomePage/styles.js'), stylesHomePage)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/containers/index.js'), indexContainers)
  } catch (error) {
    console.warn(error)
  }

  console.log(colorsTerminal.green('[Source]'), "configs");
  // configs
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/configs'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/configs/Animations.js'), configAnimations)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/configs/index.js'), indexConfigs)
  } catch (error) {
    console.warn(error)
  }

  console.log(colorsTerminal.green('[Source]'), "stores");
  // stores
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/stores'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/stores/actions'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/stores/reducers'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/stores/sagas'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }

  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/actions/network.js'), networkAction)
  } catch (error) {
    console.warn(error)
  }

  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/reducers/init.js'), initReducers)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/reducers/network.js'), networkReducers)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/reducers/index.js'), indexReducers())
  } catch (error) {
    console.warn(error)
  }

  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/sagas/init.js'), initSagas)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/sagas/index.js'), indexSagas)
  } catch (error) {
    console.warn(error)
  }

  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/index.js'), indexStores)
  } catch (error) {
    console.warn(error)
  }


  console.log(colorsTerminal.green('[Source]'), "routers");
  // routers
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/routers'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/routers/index.js'), indexRouter)
  } catch (error) {
    console.warn(error)
  }

  console.log(colorsTerminal.green('[Source]'), "utils");
  // utils
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('src/utils'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/index.js'), indexUtils)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/styles.js'), styles)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/colors.js'), colors)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/strings.js'), strings)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/constants.js'), constants)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/functions.js'), functions)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/fetchs.js'), fetchs)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/audioPlayer.js'), audioPlayer)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/asyncStorage.js'), asyncStorage)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/types.js'), types)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/networkTracker.js'), networkTracker)
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/package.json'), JSON.stringify({ name: '@utils' }))
  } catch (error) {
    console.warn(error)
  }

  console.log(colorsTerminal.green('[Source]'), "debugging");
  // debugging
  try {
    fs.mkdirSync(sh.pwd().stdout + "/" + ('debugging'), { recursive: true })
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('debugging/ReactotronConfig.js'), ReactotronConfig)
  } catch (error) {
    console.warn(error)
  }

  console.log(colorsTerminal.green('[Source]'), "App");
  // App
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/App.js'), appRoot())
  } catch (error) {
    console.warn(error)
  }

  console.log(colorsTerminal.green('[Source]'), "delete");
  // delete
  try {
    fs.unlinkSync(sh.pwd().stdout + "/" + ('App.js'))
  } catch (err) {
    console.warn(err)
  }
  // rmdirAsync(sh.pwd().stdout + "/" +('ios/' + projectName + '-tvOS'))
  // rmdirAsync(sh.pwd().stdout + "/" +('ios/' + projectName + '-tvOSTests'))
  // rmdirAsync(sh.pwd().stdout + "/" +('ios/' + projectName + 'Tests'))

  console.log(colorsTerminal.green('[Source]'), "root app");
  // root app
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('index.js'), indexApp)
  } catch (error) {
    console.warn(error)
  }

  sh.rm("package-lock.json");
  console.log(colorsTerminal.green('Done!'));
}
main();