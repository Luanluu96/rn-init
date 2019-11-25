const asyncStorage = `
import { AsyncStorage } from "react-native";
/**
 *
 * @param {*string} args
 * @return {promise}
 */
const get = function (...args) {
  return new Promise.all(
    args.map((v, i) => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem(v, (err, result) => {
          if (err !== null) reject(err);
          resolve(result);
        });
      });
    })
  );
};

/**
 * -- save multi to asyncStorage
 * @param {object{[key:value]}} args
 * @return {promise}
 */

const set = function (args) {
  return new Promise.all(
    Object.keys(args).map((v, i) => {
      return new Promise((resolve, reject) => {
        AsyncStorage.setItem(v, args[v], err => {
          if (err !== null) reject("AppStorage set", err);
          resolve();
        });
      });
    })
  );
};

/**
 * -- remove multi to asyncStorage
 * @param {object{[key:value]}} args
 * @return {promise}
 */

const remove = function (...args) {
  return new Promise.all(
    args.map((v, i) => {
      return new Promise((resolve, reject) => {
        AsyncStorage.removeItem(v, (err, result) => {
          if (err !== null) reject(err);
          resolve();
        });
      });
    })
  );
};

/**
 * -- remove all to asyncStorage
 * @return {promise}
 */
let keys = [
];
const clearAll = function () {
  return new Promise((resolve, reject) => {
    AsyncStorage.multiRemove(keys, (err, result) => {
      if (err !== null) reject(err);
      resolve();
    });
  });
};


export default {
  get,
  set,
  remove,
  clearAll
};
`

const audioPlayer = `import Sound from 'react-native-sound';

class AudioPlayer {
  player: Sound;
  currentUrl: string;
  loops: number = 0;
  isPlaying: Boolean;
  sliderEditing: Boolean;
  duration: Number;

  constructor() {
    this.player = null;
    this.currentUrl = null;
    this.isPlaying = false;
    this.sliderEditing = false;
    this.duration = 0.0;
  }
  init(url: String, callback: Function = Function()) {
    if (!url) return callback(false);
    this.player = new Sound(url, null, (error: Error) => {
      if (error) {
        return callback(false);
      }
      this.duration = this.player.getDuration();
      this.currentUrl = url;
      callback(true);
    });
  }
  play(url: string, callback: Function = Function()) {
    if (!this.player) {
      this.init(url, (status: boolean) => {
        if (status) {
          if (this.player !== null) {
            this.isPlaying = true;
            this.player.setNumberOfLoops(this.loops)
            this.player.play((success) => { this.player.release(); callback(status && success); });
          }
        }
      })
      return;
    }
    this.player.stop().release();
    this.player = null;
    this.play(url, callback);
  }
  pause() {
    this.isPlaying = false;
    if (this.player == null) return;
    if (!this.player.isLoaded()){
      this.player.stop();
      return;
    }
    this.player.pause();
  }
  resume(callback: Function = Function()) {
    this.isPlaying = true;
    if (this.player === null) return;
    this.player.setNumberOfLoops(this.loops);
    this.player.play((success: boolean) => {
      if (success) {
        this.player.reset();
      }
      if (this.player === null) return
      this.player.pause().release();
      callback(success);
    });
  }
  release() {
    this.isPlaying = false;
    clearInterval(this.interval);
    if (this.player === null) return;
    this.player.setNumberOfLoops(0);
    this.player.stop();
    this.loops = 0;
    this.currentUrl = null;
  }
  setLoops(loops: number) {
    this.loops = loops;
  }
  onSliderEditStart() {
    this.sliderEditing = true;
  }
  onSliderEditEnd() {
    this.sliderEditing = false;
  }
  onSliderEditing(value) {
    if (this.player) {
      this.player.setCurrentTime(value);
    }
  }
  getCurrentTime(callback: Function = Function()) {
    this.interval = setInterval(() => {
      if (this.player && this.player.isLoaded() && this.isPlaying && !this.sliderEditing) {
        this.player.getCurrentTime((seconds, isPlaying) => {
          callback(seconds);
        })
      }
    }, 100);
  }
  jumpPrev30Seconds = (callback: Function = Function()) => { this.jumpSeconds(-30, callback); }
  jumpNext30Seconds = (callback: Function = Function()) => { this.jumpSeconds(30, callback); }
  jumpPrev15Seconds = (callback: Function = Function()) => { this.jumpSeconds(-15, callback); }
  jumpNext15Seconds = (callback: Function = Function()) => { this.jumpSeconds(15, callback); }
  jumpSeconds = (secsDelta: Number, callback: Function) => {
    if (this.player) {
      this.player.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > this.duration) nextSecs = this.duration;
        this.player.setCurrentTime(nextSecs);
        callback(nextSecs);
      })
    }
  }
}
const audioPlayer = new AudioPlayer();
export default audioPlayer;
`

const colors = `

const COLORS_MOCK = [
  { color: '#2D4EF5', title: 'Primary' },
  { color: '#4CE2A7', title: 'Success' },
  { color: '#E24C4C', title: 'Error' },
  { color: '#F1A153', title: 'Alert' },
  { color: '#022047', title: 'Dark' },
]

const GRADIENTS_MOCK = [
  { colors: ['#8AA8F8', '#2D4EF5'], title: 'Primary' },
  { colors: ['#B3F6DC', '#4CE2A7'], title: 'Success' },
  { colors: ['#FFB2B2', '#E24C4C'], title: 'Error' },
  { colors: ['#FFDEBE', '#F1A153'], title: 'Alert' },
  { colors: ['#547298', '#022047'], title: 'Dark' },
]

const GREYS = [
  { color: '#FAFAFA', title: '100' },
  { color: '#E5E5E5', title: '200' },
  { color: '#CCCCCC', title: '300' },
  { color: '#999999', title: '400' },
  { color: '#666666', title: '500' },
  { color: '#333333', title: '600' },
]


const COLORS = {
  white: '#FFF',
  COLORS_MOCK,
  GRADIENTS_MOCK,
  GREYS,
}



export default COLORS;
`

const styles = `import { Dimensions, Platform, PixelRatio } from "react-native";

import { normalize } from './functions';
import COLORS from "./colors";
const { width } = Dimensions.get('window');
const IOS = Platform.OS === "ios";
const height = IOS
  ? Dimensions.get("window").height
  : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

const menubarBottomHeight = IOS
  ? 0
  : require("react-native-extra-dimensions-android").get("SOFT_MENU_BAR_HEIGHT");

// base on iphone X
const widthIphoneX = 375;
const heightDesignApp = 812;
const widthDesignApp = 375;

const heightHeader = (44 / heightDesignApp * height);
const iconSizeHeader = heightHeader * 0.5;

const customFontSize = (value) => ({
  fontSize: normalize(value),
})

const Heading = [
  'heading 1',
  'heading 2',
  'heading 3',
  'heading 4',
  'heading 5',
  'heading 6',
]

const H = {
  'heading 1': { size: customFontSize(120), temp: 'Aa', title: 'heading 1' },
  'heading 2': { size: customFontSize(80), temp: 'Bb', title: 'heading 2' },
  'heading 3': { size: customFontSize(60), temp: 'Cc', title: 'heading 3' },
  'heading 4': { size: customFontSize(40), temp: 'Dd', title: 'heading 4' },
  'heading 5': { size: customFontSize(30), temp: 'Dd', title: 'heading 5' },
  'heading 6': { size: customFontSize(22), temp: 'Dd', title: 'heading 6' }
}

const widthRatio = (value) => value / widthDesignApp * width
const heightRatio = (value) => value / heightDesignApp * height;
const widthHeightRatio = (width, height) => ({
  width: widthRatio(width),
  height: heightRatio(height)
});
const centerScreen = (padding) => (width - padding) / 2;

const STYLES = {
  IOS,
  heightHeader,
  iconSizeHeader,
  iconHeader: (heightDesign) => ({
    width: heightDesign / heightDesignApp * height,
    height: heightDesign / heightDesignApp * height,
  }),
  widthScreen: width,
  heightScreen: height,

  heightDesignApp,
  widthDesignApp,
  widthRatio,
  heightRatio,
  widthHeightRatio,

  menubarBottomHeight,
  centerScreen,

  // icons size 
  iconSizeXXXLarge: 64 / widthIphoneX * width,
  iconSizeXXLarge: 56 / widthIphoneX * width,
  iconSizeXLarge: 48 / widthIphoneX * width,
  iconSizeLarge: 32 / widthIphoneX * width,
  iconSizeMedium: 24 / widthIphoneX * width,
  iconSizeSmall: 18 / widthIphoneX * width,
  iconSizeMini: 12 / widthIphoneX * width,
  iconXXXLarge: {
    width: 64 / widthIphoneX * width,
    height: 64 / widthIphoneX * width,
  },
  iconXXLarge: {
    width: 56 / widthIphoneX * width,
    height: 56 / widthIphoneX * width,
  },
  iconXLarge: {
    width: 48 / widthIphoneX * width,
    height: 48 / widthIphoneX * width,
  },
  iconLarge: {
    width: 32 / widthIphoneX * width,
    height: 32 / widthIphoneX * width,
  },
  iconMedium: {
    width: 24 / widthIphoneX * width,
    height: 24 / widthIphoneX * width,
  },
  iconSmall: {
    width: 18 / widthIphoneX * width,
    height: 18 / widthIphoneX * width,
  },
  iconMini: {
    width: 12 / widthIphoneX * width,
    height: 12 / widthIphoneX * width,
  },

  // image size

  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  underline: { textDecorationLine: 'underline' },

  //font size
  mini: {
    fontSize: normalize(12),
  },
  small: {
    fontSize: normalize(15),
  },
  medium: {
    fontSize: normalize(17),
  },
  large: {
    fontSize: normalize(20),
  },
  xlarge: {
    fontSize: normalize(24),
  },
  customFontSize,
  Heading,
  H,
  H1: H[Heading[0]].size,
  H2: H[Heading[1]].size,
  H3: H[Heading[2]].size,
  H4: H[Heading[3]].size,
  H5: H[Heading[4]].size,
  H6: H[Heading[5]].size,
  bottomItem: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  rightItem: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  justifySpaceBetweenItemRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  itemCarouselBannerWidth: widthRatio(320),
  itemCarouselBannerHeight: heightRatio(150),
  sliderWidth: width,

  shadow: (color: String = COLORS.gray) => ({
    ...Platform.select({
      ios: {
        shadowColor: color,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    })
  }),

  textJustify: {
    textAlign: IOS ? 'justify' : 'left'
  },

  // screenshot
  sizeSceenShotView: {
    width: (width * 0.85) / 2,
    height: height * 1 / 7,
  },

  //Comments
  commentBox: {
    minHeight: 100,
    width,
  },

  //
  autoWidthHeight: {
    width: 'auto',
    height: 'auto',
  },
}

export default STYLES;`

const constants = `const url_root = 'localhost:9091'

const URLS = {
  login: url_root + '/api/login',

}

const KEY_ASYNC_STORE = {
  ACCOUNT: '@ACCOUNT',
}

const KEY_REDUX_STORE = {
  LOGIN_FETCHING: '@LOGIN_FETCHING',
  LOGIN_SUCCESS: '@LOGIN_SUCCESS',
  LOGIN_FAILED: '@LOGIN_FAILED',
  CLEAR_ACCOUNT: '@CLEAR_ACCOUNT',

  // internet status
  UPDATE_INTERNET_CONNECTION_STATE: '@UPDATE_INTERNET_CONNECTION_STATE',
}

const SCREEN_NAME = {
  HOME_PAGE: 'HomePage',

  PROFILE_PAGE: 'Profile',
  PROFILE_ABOUT_US_PAGE: 'ProfileAboutUs',
  PROFILE_PURCHASE_PAGE: 'ProfilePurchase',
  PROFILE_RECHARGE_PAGE: 'ProfileRecharge',
  PROFILE_FAVORITES_PAGE: 'ProfileFavorites',
}

export {
  KEY_ASYNC_STORE,
  KEY_REDUX_STORE,
  SCREEN_NAME,
}
`

const fetches = `import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import strings from "./strings";

const timeOutDefault = 20000;
const AbortController = window.AbortController;
export const HEADER_DEFAULT = {
  method: "GET",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
}
const HEADER_MULTI_DEFAULT = {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "multipart/form-data"
  },
}

export const STATUS_CODE = {
  0: { status: false, message: 'skipped' },
  200: { status: true, message: 'OK' },
  201: { status: true, message: 'Created' },
  400: { status: false, message: 'Bad Request response status code' },
  403: { status: false, message: 'Forbidden' },
  404: { status: false, message: 'Not found' },
  500: { status: false, message: 'Internal Server ErrorHTTP' },
}

async function outputError(response) {
  let error = {};
  try {
    error = await response.json();

    if (typeof error == "string") {
      error = { error: error };
    }
  } catch (e) { error = {}; }

  error["status"] = false;
  error["statusCode"] = response.status;

  if (!error.hasOwnProperty("error")) {
    if (STATUS_CODE[response.status].message) {
      error["error"] = STATUS_CODE[response.status].message;
    } else {
      error["error"] = strings.SOMETHING_WENT_WRONG_ON_API_SERVER;
    }
  }

  return error;
}

async function FetchBase(request, handleTimeOut) {
  return new Promise((resolve, reject) => {
    fetch(request)
      .then(async response => {
        if (STATUS_CODE[response.status].status) {
          let jsonObject = await response.json();
          if (typeof jsonObject == "string") {
            jsonObject = { message: jsonObject };
          }
          jsonObject["status"] = true;
          jsonObject["statusCode"] = response.status;
          return jsonObject;
        } else if (!STATUS_CODE[response.status].status) {
          return outputError(response);
        }
      })
      .then(responseJson => {
        clearTimeout(handleTimeOut);
        if (responseJson.status) {
          resolve(responseJson);
          log(results)
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        clearTimeout(handleTimeOut);
        reject({ status: false, statusCode: 500, error: strings.SOMETHING_WENT_WRONG_ON_API_SERVER });
      });
  });
}

export async function Fetch(url, optionHeader = HEADER_DEFAULT, timeOut = timeOutDefault) {
  const controller = new AbortController();
  const signal = controller.signal;
  let handleTimeOut = setTimeout(() => {
    controller.abort();
    reject({ status: false, statusCode: 500, message: strings.REQUEST_TIME_OUT });
  }, timeOut);

  let newOptionHeader = optionHeader;
  newOptionHeader['signal'] = signal;

  const myRequest = new Request(url, newOptionHeader);
  return FetchBase(myRequest, handleTimeOut);
}

export async function FetchList(url, listData, optionHeader = HEADER_MULTI_DEFAULT, timeOut = timeOutDefault) {
  let newTimeOut = timeOut * (listData && listData.length > 0 ? listData.length : 1);

  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let handleTimeOut = setTimeout(() => {
      controller.abort();
      reject({ status: false, statusCode: 500, error: strings.REQUEST_TIME_OUT });
    }, newTimeOut);

    let fetches = [];
    let arr = [];
    let formData;
    listData.map(v => {
      formData = new FormData();
      formData.append("file", v.data);


      let newOptionHeader = optionHeader;
      newOptionHeader['signal'] = signal;
      newOptionHeader['body'] = formData;
      const myRequest = new Request(url, newOptionHeader);

      fetches.push(FetchBase(myRequest));
    });
    Promise.all(fetches)
      .then((response) => {
        clearTimeout(handleTimeOut);
        resolve(response);
      })
      .catch(error => {
        clearTimeout(handleTimeOut);
        reject({ status: false, statusCode: 500, error: strings.SOMETHING_WENT_WRONG_ON_API_SERVER });
      });
  });
}
`

const functions = `import { Dimensions, Platform, PixelRatio } from 'react-native';
const IOS = Platform.OS === "ios";

const {
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const pixelRatio = PixelRatio.get();

// Use iPhoneX as base size which is 375 x 812
const baseWidth = 375;
const baseHeight = 812;

const scaleWidth = SCREEN_WIDTH / baseWidth;
const scaleHeight = SCREEN_HEIGHT / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export function normalize(size) {
	return Math.ceil((size * scale));
}
function formatDate() {
	var d = new Date(),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

export const FormatMoney = (number) => {
	if (number < 0) {
		number = 0;
	}
	return accounting.formatMoney(number, "€ ", 0)
};

export const ArrayUtils = {
	isEmpty: (arrays) => {
		return !(arrays && arrays.length > 0);
	}
}

export const groupStyle = (arrays: Array<any>) => {
	if (ArrayUtils.isEmpty(arrays) && !Array.isArray(arrays) && arrays.length <= 1) return arrays;
	let newStyle = [arrays[0]];
	arrays.slice(1, arrays.length).forEach(value => {
		if (Array.isArray(value)) {
			newStyle = [...newStyle, ...value];
		} else {
			newStyle.push(value);
		}
	});
	return newStyle;
}

export function millisecondToTimeProgress(second) {

	const minute = Math.floor(second / 60);
	const secondBalance = Math.floor(second % 60);
	return minute + ':' + secondBalance;
}
// or
export function getAudioTimeString(seconds) {
	const h = parseInt(seconds / (60 * 60));
	const m = parseInt(seconds % (60 * 60) / 60);
	const s = parseInt(seconds % 60);
	let timeString = '';
	if (h) {
		timeString += (h < 10 ? '0' + h : h) + ':';
	}
	timeString += ((m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
	return timeString;
}

export function exportTabRouteConfigsToArray(routeConfigs) {
	return Object.keys((key) => {
		return {
			key,
			...routeConfigs[key],
		}
	})
}`

const strings = `const strings = {
  REQUEST_TIME_OUT: 'request time out',
  SOMETHING_WENT_WRONG_ON_API_SERVER: 'something went wrong on api server',
}

export default strings;`

const getIconType = `import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const customIcons = {};

export const registerCustomIconType = (id, customIcon) => {
  customIcons[id] = customIcon;
};

export default type => {
  switch (type) {
    case 'zocial':
      return ZocialIcon;
    case 'octicon':
      return OcticonIcon;
    case 'material':
      return MaterialIcon;
    case 'material-community':
      return MaterialCommunityIcon;
    case 'ionicon':
      return Ionicon;
    case 'foundation':
      return FoundationIcon;
    case 'evilicon':
      return EvilIcon;
    case 'entypo':
      return EntypoIcon;
    case 'font-awesome':
      return FAIcon;
    case 'simple-line-icon':
      return SimpleLineIcon;
    case 'feather':
      return FeatherIcon;
    default:
      if (customIcons.hasOwnProperty(type)) {
        return customIcons[type];
      }
      return MaterialIcon;
  }
};`

const types = (vectorIcon) => vectorIcon ? `const IconTypes = {
  zocial: 'zocial',
  octicon: 'octicon',
  material: 'material',
  materialcommunity: 'material-community',
  ionicon: 'ionicon',
  foundation: 'foundation',
  evilicon: 'evilicon',
  entypo: 'entypo',
  fontawesome: 'font-awesome',
  simplelineicon: 'simple-line-icon',
  feather: 'feather',
}

export {
  IconTypes,
}` : ``;

const networkTracker = `import React, { Component } from "react";
import { updateInternetConnectionState } from '../stores/actions/network';
import NetInfo from "@react-native-community/netinfo";

export default class NetworkTracker {
  constructor(store) {
    this.reduxStore = store
  }

  startTracking() {
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state.type);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      this._handleConnectivityChange(state.isConnected)
    });
    NetInfo.addEventListener(
      'connectionChange',
    );
  }

  stopTracking() {
    unsubscribe();
  }

  _handleConnectivityChange = isConnected => {
    this.reduxStore.dispatch(updateInternetConnectionState(isConnected))
  };
}
`

const indexHomePage = `import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

// styles
import styles from './styles';

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> HomePage </Text>
      </View>
    );
  }
}
`

const stylesHomePage = `import { StyleSheet } from 'react-native';
import STYLES from '../../utils/styles';
import COLORS from '../../utils/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...STYLES.centerItem,
  },
});

export default styles;`

const indexContainers = `import HomePage from './HomePage';

export {
  HomePage,
}`

const indexRouter = `import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Animated, Easing } from 'react-native';
import { SCREEN_NAME } from '../utils/constants';
import { Animations } from '../configs';

import {
	HomePage
} from '../containers';

const Router = createStackNavigator({
	HomePage: { screen: HomePage },
}, {
	initialRouteName: SCREEN_NAME.HOME_PAGE,
	swipeEnabled: true,
	animationEnabled: false,
	headerMode: 'none',
	navigationOptions: {
		header: null
	},
	lazy: true,
	cardStyle: {
		backgroundColor: '#FFF',
		opacity: 1
	},
	transitionConfig: () => ({
		transitionSpec: {
			duration: 300,
			easing: Easing.out(Easing.poly(4)),
			timing: Animated.timing,
			useNativeDriver: true,
		},
		screenInterpolator: (sceneProps) => {
			const { scene } = sceneProps;
			const thisSceneIndex = scene.index;
			return Animations.slideFromRight(sceneProps)
		},
		containerStyle: {
			backgroundColor: 'transparent',
		},
	})
});
export default createAppContainer(Router);`

const indexUtils = (vectorIcon) => `import STYLES from './styles';
import COLORS from './colors';
${vectorIcon ? `import { IconTypes } from './types';` : ``}
import strings from './strings';
import { ArrayUtils } from './function';

export {
	STYLES,
	COLORS,
  ${vectorIcon ? `IconTypes,` : ``}
	IconTypes,
	strings,
	ArrayUtils
}`

const appRoot = ({ networkTrackerEnable } = { networkTrackerEnable: true }) => `import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View, AppState, Platform } from 'react-native';
import { Provider } from "react-redux";

import '../debugging/ReactotronConfig';
${networkTrackerEnable ? `import NetworkTracker from './utils/networkTracker';` : ``}

import Router from './routers';
import Store from './stores';

console.disableYellowBox = true;
let originalGetDefaultProps = Text.getDefaultProps;
Text.getDefaultProps = function () {
  return {
    ...originalGetDefaultProps(),
    allowFontScaling: false,
  };
};

type Props = {};
type State = {};

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    ${{ networkTrackerEnable: true } ? `this.networkTracker = new NetworkTracker(Store);` : ''}
    this.state = { appState: AppState.currentState };
  }
  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
    ${{ networkTrackerEnable: true } ? `this.networkTracker.startTracking();` : ''}
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
    ${{ networkTrackerEnable: true } ? `this.networkTracker.stopTracking();` : ''}
  }

  handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      // TODO:
      if(Platform.OS === "android"){
        
      }

    } else if (nextAppState.match(/inactive|background/) && this.state.appState === 'active') {
      // TODO:
      if(Platform.OS === "android"){
        
      }
    }
    this.setState({ appState: nextAppState });
  };
  render() {
    return (
      <Provider store={Store}>
        <View style={styles.container}>
          <Router />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
`

const initReducers = `const initialState = {
  ids: ['id_1','id_2', 'id_3','id_4'],
  data:{
    'id_1': {},
    'id_2': {},
    'id_3': {},
    'id_4': {},
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
  default:
    return state
  }
};
`

const networkAction = `import { KEY_REDUX_STORE } from "../../utils/constants";

export const updateInternetConnectionState = (isConnected) => ({
  type: KEY_REDUX_STORE.UPDATE_INTERNET_CONNECTION_STATE,
  payload: isConnected
});
`

const networkReducers = `import { KEY_REDUX_STORE } from "../../utils/constants";

export const isInternetConnected = (state = true, action) => {
  switch (action.type) {
    case KEY_REDUX_STORE.UPDATE_INTERNET_CONNECTION_STATE:
      return action.payload;
    default:
      return state;
  }
};`

const indexReducers = ({ networkTrackerEnable } = { networkTrackerEnable: true }) => `import { combineReducers } from 'redux';
import init from './init';
import { isInternetConnected } from './network';

const reducer = combineReducers({
  init,
  ${networkTrackerEnable ? `isInternetConnected, ` : ``}
})

export default reducer;
`

const indexStoresThunk = `import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Reactotron from "../../debugging/ReactotronConfig";

import reducer from './reducers';

const middleware = applyMiddleware(thunk);

// mount it on the Store
const Store = __DEV__ ?
  createStore(
    reducer,
    compose(
      middleware,
      Reactotron.createEnhancer(),
    )
  ) : createStore(
    reducer,
    middleware
  )

export default Store;`

const indexStoresSaga = `import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Reactotron from '../../debugging/ReactotronConfig';

import reducer from './reducers';
import rootSaga from './sagas';

// create our new saga monitor
const sagaMonitor = Reactotron.createSagaMonitor()

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

// mount it on the Store
const Store = __DEV__ ?
  createStore(
    reducer,
    compose(
      applyMiddleware(sagaMiddleware),
      Reactotron.createEnhancer()
    )
  ) : createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  )

sagaMiddleware.run(rootSaga);

export default Store;
`

const initSagas = `function* loginSaga() {
  
}`

const indexSagas = `import { all } from 'redux-saga/effects';


function* rootSaga() {
  yield all([
  ])
}

export default rootSaga;
`

const indexAssets = `import ICONS from "./icons";
import IMAGES from "./images";

export {
  ICONS,
  IMAGES,
}`

const indexImages = `const IMAGES = {
}
export default IMAGES;`
const indexIcons = `const ICONS = {
}
export default ICONS;`

const indexComponents = `import Button from './Button';
import Header from './Header';
import List from './List';
import Spinner from './Spinner';
import * as Label from './Label';
import Switch from './Switch';

export {
  Button,
  Header,
  List,
  Spinner,
  Label,
  Switch,
}`

const switchComponents = `var React = require('react');
var ReactNative = require('react-native');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var {
  PanResponder,
  View,
  TouchableHighlight,
  Animated,
  ViewPropTypes,
} = ReactNative;

var Switch = createReactClass({
  padding: 8,

  propTypes: {
    value: PropTypes.bool,
    style: ViewPropTypes.style,
    inactiveButtonColor: PropTypes.string,
    inactiveButtonPressedColor: PropTypes.string,
    activeButtonColor: PropTypes.string,
    activeButtonPressedColor: PropTypes.string,
    buttonShadow: ViewPropTypes.style,
    activeBackgroundColor: PropTypes.string,
    inactiveBackgroundColor: PropTypes.string,
    buttonRadius: PropTypes.number,
    switchWidth: PropTypes.number,
    switchHeight: PropTypes.number,
    buttonContent: PropTypes.element,
    enableSlide: PropTypes.bool,
    enableSlideDragging: PropTypes.bool,
    switchAnimationTime: PropTypes.number,
    onActivate: PropTypes.func,
    onDeactivate: PropTypes.func,
    onValueChange: PropTypes.func,
  },

  getDefaultProps() {
    return {
      value: false,
      style: {},
      inactiveButtonColor: '#FFFFFF',
      inactiveButtonPressedColor: '#FFFFFF',
      activeButtonColor: '#FFFFFF',
      activeButtonPressedColor: '#FFFFFF',
      buttonShadowOff: {
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: { height: 3, width: 0 },
      },
      buttonShadowOn: {
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.7,
        shadowRadius: 1,
        shadowOffset: { height: 0.5, width: 0.5 },
      },
      backgroundShadow: {
        shadowOpacity: 0.4,
        shadowRadius: 1,
      },
      activeBackgroundColor: '#118303',
      inactiveBackgroundColor: '#FFFFFF',
      buttonRadius: 29 / 2,
      switchWidth: 50,
      switchHeight: 29,
      buttonContent: null,
      buttonOffset: 0,
      enableSlide: true,
      enableSlideDragging: true,
      switchAnimationTime: 200,
      onActivate: function () { },
      onDeactivate: function () { },
      onValueChange: function () { },
    };
  },

  getInitialState() {
    var w = (this.props.switchWidth - Math.min(this.props.switchHeight, this.props.buttonRadius * 2) - this.props.buttonOffset);

    return {
      width: w,
      state: this.props.value,
      position: new Animated.Value(this.props.value ? w : this.props.buttonOffset),
    };
  },

  start: {},

  componentWillMount: function () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        if (!this.props.enableSlide) return;

        this.setState({ pressed: true });
        this.start.x0 = gestureState.x0;
        this.start.pos = this.state.position._value;
        this.start.moved = false;
        this.start.state = this.state.state;
        this.start.stateChanged = false;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (!this.props.enableSlide) return;

        this.start.moved = true;
        if (this.start.pos == 0) {
          if (gestureState.dx <= this.state.width && gestureState.dx >= 0) {
            this.state.position.setValue(gestureState.dx);
          }
          if (gestureState.dx > this.state.width) {
            this.state.position.setValue(this.state.width);
          }
          if (gestureState.dx < 0) {
            this.state.position.setValue(0);
          }
        }
        if (this.start.pos == this.state.width) {
          if (gestureState.dx >= -this.state.width && gestureState.dx <= 0) {
            this.state.position.setValue(this.state.width + gestureState.dx);
          }
          if (gestureState.dx > 0) {
            this.state.position.setValue(this.state.width);
          }
          if (gestureState.dx < -this.state.width) {
            this.state.position.setValue(0);
          }
        }
        var currentPos = this.state.position._value;
        this.onSwipe(currentPos, this.start.pos,
          () => {
            if (!this.start.state) this.start.stateChanged = true;
            this.setState({ state: true })
          },
          () => {
            if (this.start.state) this.start.stateChanged = true;
            this.setState({ state: false })
          });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({ pressed: false });
        var currentPos = this.state.position._value;
        if (!this.start.moved || (Math.abs(currentPos - this.start.pos) < 5 && !this.start.stateChanged)) {
          this.toggle();
          return;
        }
        this.onSwipe(currentPos, this.start.pos, this.activate, this.deactivate);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        var currentPos = this.state.position._value;
        this.setState({ pressed: false });
        this.onSwipe(currentPos, this.start.pos, this.activate, this.deactivate);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.state.state !== nextProps.value) {
      nextProps.value ? this.activate() : this.deactivate()
    }
  },

  onSwipe(currentPosition, startingPosition, onChange, onTerminate) {
    if (currentPosition - startingPosition >= 0) {
      if (currentPosition - startingPosition > this.state.width / 2 || startingPosition == this.state.width) {
        onChange();
      } else {
        onTerminate();
      }
    } else {
      if (currentPosition - startingPosition < -this.state.width / 2) {
        onTerminate();
      } else {
        onChange();
      }
    }
  },

  activate() {
    Animated.timing(
      this.state.position,
      {
        toValue: this.state.width,
        duration: this.props.switchAnimationTime,
        useNativeDriver: true,
      }
    ).start();
    this.changeState(true);
  },

  deactivate() {
    Animated.timing(
      this.state.position,
      {
        toValue: this.props.buttonOffset,
        duration: this.props.switchAnimationTime,
        useNativeDriver: true,
      }
    ).start();
    this.changeState(false);
  },

  changeState(state) {
    var callHandlers = this.start.state != state;
    setTimeout(() => {
      this.setState({ state: state });
      if (callHandlers) {
        this.callback();
      }
    }, this.props.switchAnimationTime / 2);
  },

  callback() {
    var state = this.state.state;
    if (state) {
      this.props.onActivate();
    } else {
      this.props.onDeactivate();
    }
    this.props.onValueChange(state);
  },

  toggle() {
    if (!this.props.enableSlide) return;

    if (this.state.state) {
      this.deactivate();
    } else {
      this.activate();
    }
  },

  render() {
    var doublePadding = this.padding * 2 - 2;
    var halfPadding = doublePadding / 2;

    let panHandlers = this.props.enableSlideDragging ? this._panResponder.panHandlers : null
    let pressHandlers = !this.props.enableSlideDragging ? { onPress: () => this.toggle() } : null

    let offsetPosition = this.state.state ? - 2 : 2;

    return (
      <View
        {...panHandlers}
        style={[{ padding: this.padding, position: 'relative' }, this.props.style]}>
        <View
          style={[{
            backgroundColor: this.state.state ? this.props.activeBackgroundColor : this.props.inactiveBackgroundColor,
            height: this.props.switchHeight,
            width: this.props.switchWidth,
            borderRadius: this.props.switchHeight / 2,
            borderColor: this.state.state ? "#b2b2b2" : '#b2b2b2',
            borderWidth: this.state.state ? 0 : 1,
          },
          { shadowColor: this.state.state ? this.props.activeBackgroundColor : this.props.inactiveBackgroundColor },
          { shadowOffset: this.state.state ? { height: 0, width: 0.2 } : { height: 1, width: -0.2 } },
          this.props.backgroundShadow]} />
        <TouchableHighlight {...pressHandlers} underlayColor='transparent' activeOpacity={1} style={{
          height: Math.max(this.props.buttonRadius * 2 + doublePadding, this.props.switchHeight + doublePadding),
          width: this.props.switchWidth + doublePadding,
          position: 'absolute',
          top: 1,
          left: 1
        }}>
          <Animated.View style={[{
            backgroundColor:
              this.state.state
                ? (this.state.pressed ? this.props.activeButtonPressedColor : this.props.activeButtonColor)
                : (this.state.pressed ? this.props.inactiveButtonPressedColor : this.props.inactiveButtonColor),
            height: this.props.buttonRadius * 2,
            width: this.props.buttonRadius * 2,
            borderRadius: this.props.buttonRadius,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            position: 'absolute',
            top: halfPadding + this.props.switchHeight / 2 - this.props.buttonRadius,
            left: this.props.switchHeight / 2 > this.props.buttonRadius ? halfPadding + offsetPosition : halfPadding + this.props.switchHeight / 2 - this.props.buttonRadius + offsetPosition,
            transform: [{ translateX: this.state.position }]
          },
          this.state.state ? this.props.buttonShadowOn : this.props.buttonShadowOff]}
          >
            {this.props.buttonContent}
          </Animated.View>
        </TouchableHighlight>
      </View>
    )
  }
});

module.exports = Switch;`

const spinnerComponents = `import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import STYLES from '../../../utils/styles';

const transparent = 'transparent';
const styles = StyleSheet.create({
  container: {
    flex: 0,
    ...STYLES.centerItem,
  },
  textContent: {
    height: 50,
    fontSize: 20,
    fontWeight: 'bold'
  },
  activityIndicator: {
    height: 50,
    width: 50,
  }
});

const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    textContent: PropTypes.string,
    textStyle: PropTypes.object,
    visible: PropTypes.bool,
    indicatorStyle: PropTypes.object,
  };

  static defaultProps = {
    visible: false,
    color: 'white',
    size: 'large', // 'normal',
  };

  _renderDefaultContent() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color={this.props.color}
          size={this.props.size}
          style={[styles.activityIndicator, { ...this.props.indicatorStyle }]}
        />
        {(this.props.textContent) && (
          <Text style={[styles.textContent, this.props.textStyle]}>
            {this.props.textContent}
          </Text>
        )}
      </View>
    );
  }

  render() {
    return (
      <Dialog
        dialogStyle={{ backgroundColor: transparent }}
        visible={this.props.visible}
      >
        {this._renderDefaultContent()}
      </Dialog>
    );
  }
}
`

const buttonComponents = `import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text, Image, Animated } from 'react-native';
import { groupStyle } from '../../../utils/functions';

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity)

const Button = (props) => {
  return (
    <TouchableOpacityAnimated
      onLongPress={() => props.onLongPress()}
      onPressIn={() => props.onPressIn()}
      onPressOut={() => props.onPressOut()}
      onPress={() => props.onPress()}
      style={groupStyle([styles.container, props.style])}
      {...props.touchableProps}>
      {
        (!props.children) && (
          <View style={groupStyle([styles.buttonContentStyle, props.buttonContentStyle])}>
            {
              (props.imageLeft) && (
                <Animated.Image
                  style={groupStyle([styles.buttonImage, props.buttonImageStyle])}
                  source={props.imageLeft}
                  resizeMode={props.resizeMode} />
              )
            }
            {
              (props.buttonText) && (
                <Text
                  style={groupStyle([styles.buttonTextContent, props.buttonTextContentStyle])}
                  numberOfLines={props.numberOfLines}>
                  {props.buttonText}
                </Text>
              )
            }
            {
              (props.source || props.imageRight) && (
                <Animated.Image
                  style={groupStyle([styles.buttonImage, props.buttonImageStyle])}
                  source={props.source | props.imageRight}
                  resizeMode={props.resizeMode} />
              )
            }
          </View>
        )
      }
      {props.children}
    </TouchableOpacityAnimated>
  )
};

export default Button;


Button.defaultProps = {

  onPress: Function(),
  onLongPress: Function(),
  onPressIn: Function(),
  onPressOut: Function(),
  resizeMode: 'contain',
  touchableProps: {}
}

Button.propTypes = {
  children: PropTypes.any,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,


  style: PropTypes.any,
  buttonContentStyle: PropTypes.any,
  buttonTextContentStyle: PropTypes.any,
  buttonText: PropTypes.string,

  buttonImageStyle: PropTypes.any,
  source: PropTypes.any,
  resizeMode: PropTypes.oneOfType(['center', 'contain', 'cover', 'repeat', 'stretch']),

  numberOfLines: PropTypes.number,

  touchableProps: PropTypes.any,
}

const styles = StyleSheet.create({
  container: {

  },
  buttonTextContentStyle: {
    fontFamily: 'Helvetica'
  }
});`

const headerComponents = `import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import STYLES from '../../../utils/styles';
import { groupStyle } from '../../../utils/functions';

const Header = (props) => {
  return (
    <SafeAreaView style={groupStyle([styles.container, props.style])}>
      {props.children}
    </SafeAreaView>
  );
}

export default Header;


Header.defaultProps = {
  children: null,

  styles: {},
}
Header.propTypes = {
  children: PropTypes.any,

  styles: PropTypes.any,
}

const styles = StyleSheet.create({
  container: {
    width: STYLES.widthScreen,
    height: STYLES.heightHeader,
    ...STYLES.justifySpaceBetweenItemRow,
  },
});`

const labelComponents = `import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Text } from 'react-native';

import STYLES from '../../../utils/styles';

import { groupStyle } from '../../../utils/functions';


const H = ({
  children, style, textStyle, color, numberOfLines
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text {...{ numberOfLines }} style={groupStyle([styles.textStyle, textStyle, color ? { color } : null])}>{children}</Text>
    </View>
  );

const H1 = ({
  children, style, textStyle, color, numberOfLines
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text {...{ numberOfLines }} style={groupStyle([styles.textStyle1, textStyle, color ? { color } : null])}>{children}</Text>
    </View>
  );

const H2 = ({
  children, style, textStyle, color, numberOfLines
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text {...{ numberOfLines }} style={groupStyle([styles.textStyle2, textStyle, color ? { color } : null])}>{children}</Text>
    </View>
  );

const H3 = ({
  children, style, textStyle, color, numberOfLines
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text {...{ numberOfLines }} style={groupStyle([styles.textStyle3, textStyle, color ? { color } : null])}>{children}</Text>
    </View>
  );

const H4 = ({
  children, style, textStyle, color, numberOfLines
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text {...{ numberOfLines }} style={groupStyle([styles.textStyle4, textStyle, color ? { color } : null])}>{children}</Text>
    </View>
  );

const H5 = ({
  children, style, textStyle, color, numberOfLines
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text {...{ numberOfLines }} style={groupStyle([styles.textStyle5, textStyle, color ? { color } : null])}>{children}</Text>
    </View>
  );

const H6 = ({
  children, style, textStyle, color, numberOfLines
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text {...{ numberOfLines }} style={groupStyle([styles.textStyle6, textStyle, color ? { color } : null])}>{children}</Text>
    </View>
  );


export default H;
export { H1, H2, H3, H4, H5, H6, }


const styles = StyleSheet.create({
  container: {
  },
  textStyle: {
    ...STYLES.medium,
  },
  textStyle1: {
    ...STYLES.H1,
    fontWeight: '400',
  },
  textStyle2: {
    ...STYLES.H2,
    fontWeight: '500',
  },
  textStyle3: {
    ...STYLES.H3,
    fontWeight: '500',
  },
  textStyle4: {
    ...STYLES.H4,
    fontWeight: '500',
  },
  textStyle5: {
    ...STYLES.H5,
    fontWeight: '500',
  },
  textStyle6: {
    ...STYLES.H6,
    fontWeight: '600',
  },
});`

const listComponents = `import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import STYLES from '../../../utils/styles';
import COLORS from '../../../utils/colors';
import { groupStyle } from '../../../utils/functions';

export default class List extends PureComponent {
  render() {
    const {
      style,
      titleList,
      titleListStyle,
      listContainer,
      data,
      renderItem,
      horizontal,
      listProps,
    } = this.props;
    return (
      <View style={groupStyle([styles.container, style])}>
        {titleList && <Text style={groupStyle([styles.titleListStyle, titleListStyle])}>{titleList}</Text>}
        <View style={groupStyle([styles.listContainer, listContainer])}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={horizontal}
            {...listProps}
          >
            {data.map((value, index) => renderItem(value, index))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

List.defaultProps = {
  data: [],
  renderItem: Function(),
  horizontal: false,
  listProps: {}
}

List.propTypes = {
  titleList: PropTypes.string,
  titleListStyle: PropTypes.any,
  data: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  listProps: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: STYLES.heightRatio(40),
  },
  titleListStyle: {
  },
  listContainer: {
  },
});`

const configAnimations = `import { Animated, Easing } from 'react-native';


function getSpringAnimations(animatedValKeys, toValue, speed = 2, bounciness = 2) {
  return animatedValKeys.map(value => Animated.spring(value, { toValue, speed, bounciness }));
}

function getTimingAnimations(animatedValKeys, toValue, duration = 1000) {
  return animatedValKeys.map(value => Animated.timing(value, { toValue, duration, easing: Easing.out(Easing.linear) }));
}


const fadeOutUp = (props) => {
  const { position, scene } = props

  const index = scene.index

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.3, 1, 0.3]
  })

  return {
    opacity,
    transform: [{ translateX }, { translateY }]
  }
}

const fadeInUp = (props) => {
  const { position, layout, scene } = props;

  const thisSceneIndex = scene.index;
  const height = layout.initHeight

  const translateY = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    outputRange: [height, 0, 0]
  })

  return { transform: [{ translateY }] };
}

const slideFromRight = (props) => {
  const { position, layout, scene } = props;

  const thisSceneIndex = scene.index;
  const width = layout.initWidth
  const translateX = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    outputRange: [width, 0, 0]
  })

  return { transform: [{ translateX }] };
}


export {
  getSpringAnimations,
  getTimingAnimations,
  fadeOutUp,
  fadeInUp,
  slideFromRight,
}`

const indexConfigs = `import * as Animations from './Animations';


export {
  Animations,
}`
const ReactotronConfigThunk = `import Reactotron, {
  trackGlobalErrors,
  asyncStorage,
  networking
} from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

// replace console.log
log = Reactotron.log

// configure
const reactotron = Reactotron.configure({
  host: "192.168.0.143"
})
  .use(reactotronRedux())
  .use(trackGlobalErrors())
  .use(networking())
  .use(asyncStorage())

if (__DEV__) reactotron.connect();

export default reactotron;
`;
const ReactotronConfigSaga = `import Reactotron, {
  trackGlobalErrors,
  asyncStorage,
  networking
} from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

// replace console.log
log = Reactotron.log

// configure
const reactotron = Reactotron.configure({
  host: 'localhost'
})
  .use(reactotronRedux())
  .use(sagaPlugin())
  .use(trackGlobalErrors())
  .use(networking())
  .use(asyncStorage())
 
if (__DEV__) reactotron.connect();

export default reactotron;
`

const indexApp = `/**
* @format
*/

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
`

const exportOptionsDevelopment = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>method</key>
	<string>development</string>
	<key>compileBitcode</key>
	<false/>
	<key>stripSwiftSymbols</key>
	<true/>
</dict>
</plist>
`

const buildScript = (appName) => `#!/usr/bin/env bash

if [ ! -d "/Users/$(whoami)/Library/Android/sdk/ndk-bundle" ]; then
	echo "SETUP ANDROID NDK"
	cd "/Users/$(whoami)/Library/Android/sdk" && {
		curl -O https://dl.google.com/android/repository/android-ndk-r20-darwin-x86_64.zip
		unzip 'android-ndk-r20-darwin-x86_64.zip'
		mv android-ndk-r20 ndk-bundle
		rm -rf 'android-ndk-r20-darwin-x86_64.zip'
		cd -
	}
fi

echo "NODE_MODULES"
if [ ! -d "node_modules" ] || [ "$1" = "-stg" ] || [ "$1" = "-staging" ] || [ "$1" = "-prod" ] || [ "$1" = "-product" ] || [ "$1" = "-production" ]; then
  npm install
fi

echo "ANDROID"
if grep -R "sdk.dir = /Users/$(whoami)/Library/Android/sdk" android/local.properties
then
	echo ""
else
	{
		echo "ndk.dir = /Users/$(whoami)/Library/Android/sdk/ndk-bundle"
		echo "sdk.dir = /Users/$(whoami)/Library/Android/sdk"
	} >> android/local.properties
fi

mkdir android/app/src/main/assets

npm run build-ios
cd ios
xcrun xcodebuild -workspace test.xcworkspace -scheme test -configuration Release archive -archivePath build/test.xcarchive
xcrun xcodebuild -exportArchive -exportPath build/testIPA -archivePath build/test.xcarchive/ -exportOptionsPlist exportOptionsDevelopment.plist

cd ..
if [ "$1" = "-r" ] || [ "$1" = "-release" ] 
then 
  npm run build-android && npm run build-release-android && open android/app/build/outputs/apk
else
  react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
  cd android/
  ./gradlew assembleDebug
  open app/build/outputs/apk/
  cd ..
fi`

const podFile = ({
  isLottie,
  isFirebase,
  isMaps,
} = { isFirebase: false, isMaps: false, }) => {
  let listPods = [];
  if (isMaps) {
    listPods.push(`pod 'GoogleMaps'  # Uncomment this line if you want to support GoogleMaps on iOS`);
    listPods.push(`pod 'Google-Maps-iOS-Utils' # Uncomment this line if you want to support GoogleMaps on iOS\n`);
  }
  if (isFirebase) {
    listPods.push(`pod 'Firebase/Core', '~> 6.3.0'`);
    listPods.push(`pod 'Firebase/Messaging'`);
    listPods.push(`pod 'Fabric'`);
    listPods.push(`pod 'Crashlytics'\n`);
  }
  return listPods;
}

module.exports = {
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
}