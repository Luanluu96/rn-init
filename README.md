### rn-structure

### Documentation
1.  [Installation](#installation)
2.  [Usage](#usage)
4.  [Structure](#structure)
5.  [Stores](#stores)
5.  [Utils](#utils)
6.  [Libraries](#libs)

## [Installation](#installation)

<a name="installation"></a>

Get started with rn-structure by installing the node module with yarn or npm:
```
npm install -g rn-structure
```
or
```
yarn add global rn-structure
```

## [Usage](#usage)

<a name="usage"></a>

```
rn-init <project-name>
```
> With custom Bundle Identifier (IOS only. For Android is coming soon or you can use [react-native-rename](https://github.com/junedomingo/react-native-rename))
```
rn-bundle <newBundleIdentifier> <project-path>
```
> **Note:**  If you don't enter a specific **project-path**, the **project-path** will take the path to the current directory

```
npm start

npm run android                         # <=> react-native run-android
npm run ios                             # <=> react-native run-ios
npm run SE                              # <=> react-native run-ios --simulator='iPhone SE'

npm run reload                          # <=> adb shell input text 'rr' working reload android build debuging
npm run toggle                          # <=> adb shell input keyevent 82 show toggle

npm run restart                         # <=> react-native start --reset-cache

npm run build-android                   # compile source code
npm run build-ios                       # compile source code 

npm run build-release-android           # build file APK release
npm run sync-android                    # clean project android

npm test
npm run coverage

```

## [Structure](#structure)

<a name="structure"></a>

```bash
  .
  ├──package.json
  ├──index.js
  ├──debugging:
  │   └──ReactotronConfig.js
  └──src:
      ├──assets:
      │   ├──package.json
      │   ├──index.js
      │   ├──data:
      │   │   ├── ...
      │   │   └──index.js
      │   ├──fonts:
      │   │   └── ...
      │   ├──icons:
      │   │   ├── ...
      │   │   └──index.js
      │   └──images:
      │       ├── ...
      │       └──index.js
      ├──common:
      │   ├── ...
      │   └──components:
      │       ├──package.json
      │       ├──index.js
      │       ├──Button
      │       │   └──index.js
      │       ├──Header:
      │       │   └──index.js
      │       ├──Label:
      │       │   └──index.js
      │       ├──Spinner:
      │       │   └──index.js
      │       └──List:
      │           └──index.js
      ├──configs:
      │   ├──Animations.js
      │   └──index.js
      ├──containers:
      │   ├──package.json
      │   ├──index.js
      │   └──HomePage:
      │       ├──styles.js
      │       └──index.js
      ├──routers:
      │   └───index.js
      ├──stores:
      │   ├──package.json
      │   ├──index.js
      │   ├──actions:
      │   │   ├── ...
      │   │   └──index.js
      │   └──reducers:
      │       ├── ...
      │       ├──init.js
      │       └──index.js
      ├──utils:
      │   ├──package.json
      │   ├──index.js
      │   ├──styles.js
      │   ├──colors.js
      │   ├──strings.js
      │   ├──constants.js
      │   ├──functions.js
      │   ├──fetchs.js
      │   ├──asyncStorage.js       
      │   └──types.js
      └──App.js
```


## [Stores](#stores)

### sagas

  ```bash
      .
      ├──stores:
          ├──package.json
          ├──index.js
          ├──actions:
          │   ├── ...
          │   └──index.js
          ├──reducers:
          │   ├── ...
          │   ├──init.js
          │   └──index.js
          └──sagas:
              ├── ...
              ├──init.js
              └──index.js
  ```

## [Utils](#utils)

<a name="utils"></a>

### Sound 
  ```bash
      .
      ├──utils:
      │   ├──...
      │   ├──audioPlayer.js            
      │   └──...
      └──...
  ```
[#Demo](https://gitlab.com/luanluuhaui/listeningbook)

## [Libraries](#libs)

<a name="libs"></a>

For UI:

```
react-native-linear-gradient@2.5.3
react-native-extra-dimensions-android@1.2.1
react-native-gesture-handler@1.1.0
react-native-iphone-x-helper@1.2.0
```

Stores:

```
redux@4.0.0
react-redux@6.0.1

```

Middleware
```
redux-saga@1.0.2
@redux-saga/is@1.0.2
```
or
```
redux-thunk
```

Navigations
```
react-navigation@3.3.2
```

Fetch:

```
abortcontroller-polyfill@1.2.1
```

Logging:
[installing reactotron](https://github.com/infinitered/reactotron)
```
reactotron-react-native@2.1.0
reactotron-redux@2.1.0
reactotron-redux-saga@4.0.1
```

Utils:

```
accounting@0.4.1
moment@2.22.2
```