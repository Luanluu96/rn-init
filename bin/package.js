var path = require('path');
var fs = require('fs');
function updatePackageJson(url) {

  var packageJson = {}
  try {
    packageJson = JSON.parse(fs.readFileSync(url + "/" + ('package.json'), 'utf8'));
  } catch (err) {
    console.error(err);
  }
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

  console.log("Update package.json");
  // update package.json
  try {
    fs.writeFileSync(url + "/" + ('package.json'), JSON.stringify(packageJson))
  } catch (error) {
    console.warn(error);
  }
}

module.exports = {
  updatePackageJson
};