### rn-structure

### Documentation
1.  [Installation](#installation)
2.  [Usage](#usage)
4.  [Structure](#structure)
5.  [Components](#Components)
5.  [Stores](#stores)
5.  [Utils](#utils)
6.  [Libraries](#libs)

## [Installation](#installation)

<a name="installation"></a>

Get started with rn-structure by installing the node module with yarn or npm:
## Installing (React Native >= 0.60.0)

```
npm install -g rn-structure
```
or
```
yarn add global rn-structure
```
## Installing (React Native == 0.59.x)

```
npm install -g rn-structure@0.3.1
```
or
```
yarn add global rn-structure@0.3.1
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

npm run reload                          # <=> adb shell input text 'rr' working reload android build debugging
npm run toggle                          # <=> adb shell input keyevent 82 show toggle

npm run restart                         # <=> react-native start --reset-cache

npm run build-android                   # compile source code
npm run build-ios                       # compile source code 

npm run build-release-android           # build file APK release
npm run sync-android                    # clean project android

npm test
npm run coverage

```
> **Note:** If you have prepared configuration for the release application, you can use the following command to create file apk, ipa.

````
sh build.sh 
````

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
      │   ├──elements:
      │   │   ├── ...
      │   │   └──index.js
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
      │       ├──Switch:
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
      │   ├──fetches.js
      │   ├──asyncStorage.js       
      │   └──types.js
      └──App.js
```

## [Components](#Components)

<a name="Components"></a>

1.  [Button](#Button)
2.  [Header](#Header)
4.  [Label](#Label)
5.  [List](#List)
5.  [Spinner](#Spinner)
5.  [Switch](#Switch)

### [Button](#Button)
<a name="Button"></a>

example
```
  <Button
    onPress={()=>{}}
    buttonText={item.title}
    source={ICONS.ic_chevron_right_black}
    buttonContentStyle={styles.buttonContentStyle}
    buttonTextContentStyle={styles.buttonTextContentStyle}
    buttonImageStyle={styles.buttonImageStyle}
  />
```
### [Label](#Label)
<a name="Label"></a>

example
```
  <Label.H5 numberOfLines={1} style={styles.titleHeaderContainerStyle} color={'#FFFFFF'}>{`Home`}</Label.H5>
```
### [Header](#Header)
<a name="Header"></a>

example
```
  <Header style={styles.header}>
    <Button onPress={this.goBack} source={ICONS.ic_back_white} style={styles.buttonBack} buttonImageStyle={styles.iconButtonBack} />
    <Label.H5 numberOfLines={1} style={styles.titleHeaderContainerStyle} color={'#FFFFFF'}>{`Home`}</Label.H5>
    <Button onPress={this.onPressSetting} source={ICONS.ic_setting_white} style={styles.buttonSetting} buttonImageStyle={styles.iconButtonSetting} />
  </Header>
```
### [List](#List)
<a name="List"></a>

### [Spinner](#Spinner)
<a name="Spinner"></a>

example
```
  <Spinner visible={isSpinning} />
```

### [Switch](#Switch)
<a name="Switch"></a>

example
```
  <Switch
    switchAnimationTime={0}
    value={data[id].isTurnOn}
    onValueChange={(value) => this.onSwitchValueChange(value)}
    switchHeight={24}
    buttonRadius={10}
    buttonOffset={2.5}
  />
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

### react-native-vector-icons 
  ```bash
      .
      ├──utils:
      │   ├──...
      │   ├──getIconType.js            
      │   └──types.js
      └──...
  ```

example
```
type ButtonProps = {
  style: any,
  textStyle: any,
  source: any,
  onPress: Function,
  iconType: string,
  iconName: string,
  iconColor: string,
  iconSize: number,
  children: string,
}

const Button = (props: ButtonIconProps) => {
  const {
    style,
    textStyle,
    source,
    onPress,
    iconType,
    iconName,
    iconColor,
    iconSize,
    children,
  } = props;
  let Icon = getIconType(iconType || 'material');
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress()} style={[styles.container, style]}>
      {
        (source) && <Image {...source} style={[styles.icon, { width: iconSize, height: iconSize }]} />
      }
      {
        (iconName) && <Icon name={iconName} size={iconSize} color={iconColor} />
      }
      {
        (children) && <Text style={[styles.text, textStyle]}>{children}</Text>
      }
    </TouchableOpacity>
  );
};

import { IconTypes } from '../types';

<Button iconType={IconTypes.ionicon} iconName={'md-search'} iconColor={'#2D4EF5'} onPress={() => console.log('test')} />
```


## [Libraries](#libs)

<a name="libs"></a>

UI:

```
react-native-linear-gradient
react-native-extra-dimensions-android
react-native-gesture-handler
react-native-iphone-x-helper
```

Stores:

```
redux
react-redux
```

Middleware
```
redux-persist
redux-actions
```

```
redux-saga
@redux-saga/is
```
or
```
redux-thunk
```


Navigation
```
react-navigation@latest
```

Fetch:

```
abortcontroller-polyfill
```

Logging:
[installing reactotron](https://github.com/infinitered/reactotron)
```
reactotron-react-native
reactotron-redux
reactotron-redux-saga
```

Utils:

```
accounting
moment
ramda
lodash
```