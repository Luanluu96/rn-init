#! /usr/bin/env node
var sh = require('shelljs');
var path = require('path');
var fs = require('fs');
var inquirer = require('inquirer');
var colorsTerminal = require('colors');
var os = require('os');

const { updatePackageJson } = require('./package');
const { generateBuildGradle, generateGradleProperties, generateBuildGradleForApp } = require('./gradle');
const {
  indexIcons,
  indexImages,
  indexAssets,
  buttonComponents,
  headerComponents,
  labelComponents,
  listComponents,
  switchComponents,
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
  getIconType,
  constants,
  functions,
  fetches,
  asyncStorage,
  audioPlayer,
  networkTracker,
  types,
  ReactotronConfigSaga,
  ReactotronConfigThunk,
  appRoot,
  indexApp,
  exportOptionsDevelopment,
  buildScript,
  podFile,
} = require('./defined');

const { rmdirSync } = require('./functions');

let ReactotronConfig = "";
let indexStores = "";
let podStringFile = "";
const name = process.argv.slice(-1)[0];

let installLibCommandLine = `npm install --save react-native-webview @react-native-community/async-storage @react-native-community/netinfo @react-native-community/viewpager abortcontroller-polyfill react-native-popup-dialog react-native-gesture-handler accounting moment react-native-extra-dimensions-android react-native-iphone-x-helper react-native-linear-gradient react-navigation react-redux redux ramda ramdasauce `
let installLibDevCommandLine = `npm install --save-dev jetifier reactotron-redux@3.1.1 reactotron-react-native@3.6.4 `;

async function main() {
  if (fs.existsSync(sh.pwd().stdout + "/" + name)) {
    await inquirer
      .prompt({
        type: 'confirm',
        name: 'DirectoryExist',
        message: 'Directory test already exists. Continue?',
        default: false
      }).then(answers => {
        if (!answers['DirectoryExist']) {
          sh.exit();
        } else {
          sh.exec(`rm -rf ${sh.pwd().stdout + "/" + name}`);
        }
      });
  }

  sh.exec(`react-native init ${name} --version="react-native@0.59.5"`);
  sh.cd(name);
  sh.exec('clear');
  sh.mkdir(sh.pwd().stdout + '/android/app/src/main/assets/')

  if (os.platform() === 'darwin') {
    sh.exec("echo \"## This file must *NOT* be checked into Version Control Systems,\n" +
      "# as it contains information specific to your local configuration.\n" +
      "#\n" +
      "# Location of the SDK. This is only used by Gradle.\n" +
      "# For customization when using a Version Control System, please read the\n" +
      "# header note.\n" +
      "ndk.dir = /Users/$(whoami)/Library/Android/sdk/ndk-bundle\n" +
      "sdk.dir = /Users/$(whoami)/Library/Android/sdk\n" +
      "\" > android/local.properties");
  } else if (os.platform() === 'win32') {
    // sh.exec("@echo off\n" +
    //   "(\n" +
    //   "  echo ## This file must *NOT* be checked into Version Control Systems,\n" +
    //   "  echo # as it contains information specific to your local configuration.\n" +
    //   "  echo #\n" +
    //   "  echo # Location of the SDK. This is only used by Gradle.\n" +
    //   "  echo # For customization when using a Version Control System, please read the\n" +
    //   "  echo # header note.\n" +
    //   "  echo ndk.dir = /Users/$(whoami)/Library/Android/sdk/ndk-bundle\n" +
    //   "  echo sdk.dir = /Users/$(whoami)/Library/Android/sdk\n" +
    //   ") > android/local.properties");
  }

  console.log(colorsTerminal.green('======================== Initalizing... ======================== '));
  if (os.platform() === 'darwin') {
    podStringFile = podFile({ appName: name });
  }
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
        installLibDevCommandLine += `reactotron-redux-saga `;
      }
    });

  await inquirer
    .prompt({
      type: 'checkbox',
      name: 'Select libraries',
      choices: [
        "★ query-string",
        "★ native-base",
        "★ react-native-keychain",
        "★ react-native-svg",
        "★ react-native-vector-icons",
        "★ react-native-firebase",
        "react-native-sound",
        "react-native-video",
        "react-native-camera",
        "react-native-hyperlink",
        "react-native-phone-call",
        "react-native-splash-screen",
        "react-native-maps",
        "react-native-permissions",
        "lottie-react-native@2.6.1",
        "react-native-scrollable-tab-view",
        "react-native-tab-view",
        "react-native-gifted-chat",
        "react-native-snap-carousel",
        "react-native-image-picker",
        "react-native-image-crop-picker@0.24.1",
        "react-native-typography",
        "react-native-offline",
        "react-native-android-open-settings",
        "react-native-keep-awake",
        "crypto-js",
        "lodash"
      ]
    })
    .then(libraries => {
      let podFileOption = {
        isFirebase: false,
        isMaps: false,
      }
      libraries['Select libraries'].forEach((lib) => {
        lib = lib.replace('★ ', '');
        if (os.platform() === 'darwin') {
          switch (lib) {
            case 'react-native-firebase':
              podFileOption['isFirebase'] = true;
              sh.exec('google-chrome https://console.firebase.google.com');
              break;
            case 'react-native-maps':
              podFileOption['isMaps'] = true;
              sh.exec('google-chrome https://console.firebase.google.com');
              break;
          }
        }
        if (lib === 'lottie-react-native') {
          installLibCommandLine += 'lottie-ios@3.0.3' + ` `
        }
        installLibCommandLine += lib + ` `
      });
      podStringFile = podFile({ appName: name, ...podFileOption });
    });

  updatePackageJson(sh.pwd().stdout);
  console.log(colorsTerminal.green('=> Installing libraries...'));
  sh.exec(installLibDevCommandLine);
  sh.exec(installLibCommandLine);

  // write pod file
  if (os.platform() === 'darwin') {
    console.log(colorsTerminal.green('=> CocoaPods...'));
    try {
      fs.writeFileSync(sh.pwd().stdout + "/" + ('ios/Podfile'), podStringFile);
    } catch (error) {
      console.warn(error)
    }
  }
  console.log(colorsTerminal.green('=> linking libraries...'));
  sh.exec('react-native link');

  // write pod file
  if (os.platform() === 'darwin') {
    console.log(colorsTerminal.green('=> CocoaPods...'));
    sh.exec('cd ./ios && pod install');
  }
  console.log(colorsTerminal.green('=> Generate android gradle...'));
  generateBuildGradle(name, sh.pwd().stdout, installLibCommandLine);
  generateBuildGradleForApp(name, sh.pwd().stdout, installLibCommandLine);
  generateGradleProperties(sh.pwd().stdout);

  console.log(colorsTerminal.green('=> jetify...'));
  sh.exec('npx jetify');
  console.log(colorsTerminal.green('=> Project Structure...'));
  const listFolders = [
    { label: 'Root src', path: `${sh.pwd().stdout}/src`, options: { recursive: true }, isCreate: true },

    { label: 'assets', path: `${sh.pwd().stdout}/src/assets`, options: { recursive: true }, isCreate: true },
    { label: 'assets', path: `${sh.pwd().stdout}/src/assets/fonts`, options: { recursive: true }, isCreate: true },
    { label: 'assets', path: `${sh.pwd().stdout}/src/assets/icons`, options: { recursive: true }, isCreate: true },
    { label: 'assets', path: `${sh.pwd().stdout}/src/assets/images`, options: { recursive: true }, isCreate: true },
    { label: 'assets', path: `${sh.pwd().stdout}/src/assets/data`, options: { recursive: true }, isCreate: true },

    { label: 'api', path: `${sh.pwd().stdout}/src/api`, options: { recursive: true }, isCreate: true },

    { label: 'common', path: `${sh.pwd().stdout}/src/common`, options: { recursive: true }, isCreate: true },
    { label: 'common/components', path: `${sh.pwd().stdout}/src/common/components`, options: { recursive: true }, isCreate: true },
    { label: 'common/components', path: `${sh.pwd().stdout}/src/common/components/Button`, options: { recursive: true }, isCreate: true },
    { label: 'common/components', path: `${sh.pwd().stdout}/src/common/components/Header`, options: { recursive: true }, isCreate: true },
    { label: 'common/components', path: `${sh.pwd().stdout}/src/common/components/Label`, options: { recursive: true }, isCreate: true },
    { label: 'common/components', path: `${sh.pwd().stdout}/src/common/components/List`, options: { recursive: true }, isCreate: true },
    { label: 'common/components', path: `${sh.pwd().stdout}/src/common/components/Spinner`, options: { recursive: true }, isCreate: true },
    { label: 'common/components', path: `${sh.pwd().stdout}/src/common/components/Switch`, options: { recursive: true }, isCreate: true },

    { label: 'containers', path: `${sh.pwd().stdout}/src/containers`, options: { recursive: true }, isCreate: true },
    { label: 'containers', path: `${sh.pwd().stdout}/src/containers/HomePage`, options: { recursive: true }, isCreate: true },

    { label: 'configs', path: `${sh.pwd().stdout}/src/configs`, options: { recursive: true }, isCreate: true },

    { label: 'stores', path: `${sh.pwd().stdout}/src/stores`, options: { recursive: true }, isCreate: true },
    { label: 'stores/action', path: `${sh.pwd().stdout}/src/stores/actions`, options: { recursive: true }, isCreate: true },
    { label: 'stores/reducers', path: `${sh.pwd().stdout}/src/stores/reducers`, options: { recursive: true }, isCreate: true },
    { label: 'stores/sagas', path: `${sh.pwd().stdout}/src/stores/sagas`, options: { recursive: true }, isCreate: installLibCommandLine.includes('redux-saga') },

    { label: 'routers', path: `${sh.pwd().stdout}/src/routers`, options: { recursive: true }, isCreate: true },

    { label: 'utils', path: `${sh.pwd().stdout}/src/utils`, options: { recursive: true }, isCreate: true },

    { label: 'debugging', path: `${sh.pwd().stdout}/debugging`, options: { recursive: true }, isCreate: true },
  ];

  listFolders.forEach(element => {
    if (element.isCreate) {
      console.log('[Project Structure]', element.label);
      try {
        fs.mkdirSync(element.path, element.options);
      } catch (err) {
        console.warn(err)
      }
    }
  });

  console.log(colorsTerminal.green('=> Source code...'));
  console.log('[Source]', "assets");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/assets/icons/index.js'), indexIcons);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/assets/images/index.js'), indexImages);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/assets/index.js'), indexAssets);
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "api");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/api/index.js'), '');
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "common");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/Button/index.js'), buttonComponents);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/Header/index.js'), headerComponents);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/Label/index.js'), labelComponents);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/List/index.js'), listComponents);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/Switch/index.js'), switchComponents);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/Spinner/index.js'), spinnerComponents);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/common/components/index.js'), indexComponents);
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "containers");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/containers/HomePage/index.js'), indexHomePage);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/containers/HomePage/styles.js'), stylesHomePage);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/containers/index.js'), indexContainers);
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "configs");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/configs/Animations.js'), configAnimations);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/configs/index.js'), indexConfigs);
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "stores");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/actions/network.js'), networkAction);
  } catch (error) {
    console.warn(error)
  }

  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/reducers/init.js'), initReducers);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/reducers/network.js'), networkReducers);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/reducers/index.js'), indexReducers());
  } catch (error) {
    console.warn(error)
  }
  if (installLibCommandLine.includes('redux-saga')) {
    try {
      fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/sagas/init.js'), initSagas);
    } catch (error) {
      console.warn(error)
    }
    try {
      fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/sagas/index.js'), indexSagas);
    } catch (error) {
      console.warn(error)
    }
  }

  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/stores/index.js'), indexStores);
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "routers");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/routers/index.js'), indexRouter);
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "utils");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/index.js'), indexUtils(installLibCommandLine.includes('react-native-vector-icons')));
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/styles.js'), styles);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/colors.js'), colors);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/strings.js'), strings);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/constants.js'), constants);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/functions.js'), functions);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/fetches.js'), fetches);
  } catch (error) {
    console.warn(error)
  }
  if (installLibCommandLine.includes('react-native-sound')) {
    try {
      fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/audioPlayer.js'), audioPlayer);
    } catch (error) {
      console.warn(error)
    }
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/asyncStorage.js'), asyncStorage);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/types.js'), types(installLibCommandLine.includes('react-native-vector-icons')));
  } catch (error) {
    console.warn(error)
  }
  if (installLibCommandLine.includes('react-native-vector-icons')) {
    try {
      fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/getIconType.js'), getIconType);
    } catch (error) {
      console.warn(error)
    }
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/networkTracker.js'), networkTracker);
  } catch (error) {
    console.warn(error)
  }
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/utils/package.json'), JSON.stringify({ name: '@utils' }));
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "debugging");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('debugging/ReactotronConfig.js'), ReactotronConfig);
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "App");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('src/App.js'), appRoot());
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "delete");
  try {
    fs.unlinkSync(sh.pwd().stdout + "/" + ('App.js'))
  } catch (err) {
    console.warn(err)
  }

  console.log('[Source]', "exportOptionsDevelopment.plist");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('ios/exportOptionsDevelopment.plist'), exportOptionsDevelopment);
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', 'build.sh');
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('build.sh'), buildScript(name));
  } catch (error) {
    console.warn(error)
  }

  console.log('[Source]', "Root index");
  try {
    fs.writeFileSync(sh.pwd().stdout + "/" + ('index.js'), indexApp);
  } catch (error) {
    console.warn(error)
  }

  sh.rm("package-lock.json");
  console.log(colorsTerminal.green('Done!'));
}
main();