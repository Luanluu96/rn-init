## Documentation
1.  [Installation](#installation)
2.  [Environment Config](#evmconfig)
5.  [Build app](#buildapp)
5.  [Crash Xcode 11](#crashxcode11)
6.  [Xcode 11 js inspector](#https://github.com/facebook/react-native/issues/27158#issuecomment-558490635)
7.  [Fix androidx](#fixandroidx)
8.  [Fix AppAuth](#fixappauth)

## [Installation:](#installation)
  ```npm install```

## [Environment Config:](#evmconfig)
  - dev: 
    File path: ```./env/.env.dev```
  
  - staging: 
    File path: ```./env/.env.production```
  
  - product:
    File path: ```./env/.env.staging```

> **NOTE:** if you want switch (or edit) to new evm for app then you close all ```Metro Bundler``` node service

## [Build app:](#buildapp)
> **NOTE:** Check your xcode version and fix node_modules with code below [xcode 11](#crashxcode11) 
> **NOTE:** remember close all ```Metro Bundler``` node service 

dev:
```
sh build.sh
```

staging:
```
sh build.sh -stg
```

product:
```
sh build.sh -prod
```

## [Crash Xcode 11:](#crashxcode11)
 + ```npm install```
 + Open file in your project ```/node_modules/react-native/React/Base/RCTModuleMethod.mm``` Then correct as quote below:
  ```swift
  static BOOL RCTParseUnused(const char **input)
  {
    return RCTReadString(input, "__attribute__((unused))") ||
          RCTReadString(input, "__attribute__((__unused__))") ||
          RCTReadString(input, "__unused");
  }
  ```

 + Open file ```/build.sh``` in project a remove block lines 20->23:
 ```sh
  if [ ! -d "node_modules" ] || [ "$1" = "-stg" ] || [ "$1" = "-staging" ] || [ "$1" = "-prod" ] || [ "$1" = "-product" ] || [ "$1" = "-production" ]; then
    rm -rf node_modules
    npm install
  fi
 ```

[Link](#https://github.com/facebook/react-native/pull/25146/files#diff-263fc157dfce55895cdc16495b55d190)

## [Fix androidx:](#fixandroidx)

### Step 1:
```
npx jetify
```

### Step 2:
```
npm run android
```

## [Fix AppAuth: ](#fixappauth)

Downgrade to 1.2.0