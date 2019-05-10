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
          if (err !== null) reject("Appstorage set", err);
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
  realse() {
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

const manubarBottomHeight = IOS
  ? 0
  : require("react-native-extra-dimensions-android").get("SOFT_MENU_BAR_HEIGHT");

// base on iphone X
const widthIphoneX = 375;
const heightDesignApp = IOS ? 812 : 667;
const widthDesignApp = IOS ? 375 : 384;

const heightHeader = (44 / heightDesignApp * height);
const heightButtonCategory = (65 / heightDesignApp * height);
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
  'heading 6': { size: customFontSize(20), temp: 'Dd', title: 'heading 6' }
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

  manubarBottomHeight,
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

  // button category
  widthButtonCategory: (width * 0.85) / 2.5,
  heightButtonCategory,

  textJustify: {
    textAlign: IOS ? 'justify' : 'left'
  },

  // screenshot
  sizeSceenShotView: {
    width: (width * 0.85) / 2,
    height: height * 1 / 7,
  },

  //button play

  buttonPlay: {
    width: 64,
    height: 64,
  },
  buttonPlaySize: 64,

  heightOptionFilmDetail: 64,

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
  LOGIN_FAILD: '@LOGIN_FAILD',
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

const fetchs = `import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import { STATUS_CODE } from "./constants";
import strings from "./strings";

const timeOutDefault = 20000;
const AbortController = window.AbortController;

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

export function FetchJsonGet(url, timeOut = timeOutDefault) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let handleTimeOut = setTimeout(() => {
      controller.abort();
      reject({ status: false, statusCode: 500, error: strings.REQUEST_TIME_OUT });
    }, timeOut);
    fetch(url, {
      signal: signal
    })
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
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        clearTimeout(handleTimeOut);
        reject({
          status: false,
          statusCode: 500,
          error: strings.SOMETHING_WENT_WRONG_ON_API_SERVER
        });
      });
  });
}

export function FetchPatchWith(
  url,
  accessToken,
  json,
  timeOut = timeOutDefault
) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let handleTimeOut = setTimeout(() => {
      controller.abort();
      reject({ status: false, statusCode: 500, error: strings.REQUEST_TIME_OUT });
    }, timeOut);
    const myRequest = new Request(url, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json),
      signal: signal
    });
    fetch(myRequest)
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
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        clearTimeout(handleTimeOut);
        reject({
          status: false,
          statusCode: 500,
          error: strings.SOMETHING_WENT_WRONG_ON_API_SERVER
        });
      });
  });
}

export async function FetchDeleteWithTokenGet(
  url,
  accessToken,
  json,
  timeOut = timeOutDefault
) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let handleTimeOut = setTimeout(() => {
      controller.abort();
      reject({ status: false, statusCode: 500, error: strings.REQUEST_TIME_OUT });
    }, timeOut);
    const myRequest = new Request(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json),
      signal: signal
    });
    fetch(myRequest)
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
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        clearTimeout(handleTimeOut);
        reject({
          status: false,
          statusCode: 500,
          error: strings.SOMETHING_WENT_WRONG_ON_API_SERVER
        });
      });
  });
}

export function FetchJsonWithTokenGet(
  url,
  accessToken,
  timeOut = timeOutDefault
) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let handleTimeOut = setTimeout(() => {
      controller.abort();
      reject({ status: false, statusCode: 500, error: strings.REQUEST_TIME_OUT });
    }, timeOut);
    const myRequest = new Request(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      },
      signal: signal
    });
    fetch(myRequest)
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
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        clearTimeout(handleTimeOut);
        reject({
          status: false,
          statusCode: 500,
          error: strings.SOMETHING_WENT_WRONG_ON_API_SERVER
        });
      });
  });
}

export async function FetchJsonWithToken(
  url,
  accessToken,
  json,
  timeOut = timeOutDefault
) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let handleTimeOut = setTimeout(() => {
      controller.abort();
      reject({ status: false, statusCode: 500, error: strings.REQUEST_TIME_OUT });
    }, timeOut);
    const myRequest = new Request(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json),
      signal: signal
    });
    fetch(myRequest)
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
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        clearTimeout(handleTimeOut);
        reject({
          status: false,
          statusCode: 500,
          error: strings.SOMETHING_WENT_WRONG_ON_API_SERVER
        });
      });
  });
}

export async function FetchJson(url, json, timeOut = timeOutDefault) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let handleTimeOut = setTimeout(() => {
      controller.abort();
      reject({ status: false, statusCode: 500, error: strings.REQUEST_TIME_OUT });
    }, timeOut);
    const myRequest = new Request(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json),
      signal: signal
    });
    fetch(myRequest)
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
        } else {
          reject(responseJson);
        }
      })
      .catch(error => {
        clearTimeout(handleTimeOut);
        reject({
          status: false,
          statusCode: 500,
          error: strings.SOMETHING_WENT_WRONG_ON_API_SERVER
        });
      });
  });
}

export function FetchJsonWait(list, json, timeOut = timeOutDefault) {
  let newTimeOut = timeOut * (list && list.length > 0 ? list.length : 1);
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let handleTimeOut = setTimeout(() => {
      controller.abort();
      reject({ status: false, statusCode: 500, error: strings.REQUEST_TIME_OUT });
    }, newTimeOut);
    let fetches = [];
    let arr = [];
    list.map(v => {
      const myRequest = new Request(v.link, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json),
        signal: signal
      });
      fetches.push(
        fetch(myRequest)
          .then(data => data.json())
          .then(dataJson => {
            arr.push({ key_store: v.key_store, data: dataJson.rows });
          })
      );
    });
    Promise.all(fetches).then(() => {
      clearTimeout(handleTimeOut);
      resolve(arr);
    });
  });
}

export function FetchProfileImageWait(
  url,
  list,
  accessToken,
  timeOut = timeOutDefault
) {
  let newTimeOut = timeOut * (list && list.length > 0 ? list.length : 1);
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const signal = controller.signal;
    let handleTimeOut = setTimeout(() => {
      controller.abort();
      reject({ status: false, statusCode: 500, error: strings.REQUEST_TIME_OUT });
    }, newTimeOut);
    let fetches = [];
    let arr = [];
    list.map(v => {
      const formData = new FormData();
      formData.append("file", v.data);
      const myRequest = new Request(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
          "Content-Type": "multipart/form-data"
        },
        body: formData,
        signal: signal
      });
      fetches.push(
        fetch(myRequest)
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
          .then(dataJson => {
            if (dataJson.status) {
              arr.push({ param: v.param, data: dataJson.url });
            } else {
              arr.push({
                param: v.param,
                data: null,
                message: dataJson.message
              });
            }
          })
      );
    });
    Promise.all(fetches)
      .then(() => {
        clearTimeout(handleTimeOut);
        resolve(arr);
      })
      .catch(error => {
        clearTimeout(handleTimeOut);
        reject({
          status: false,
          statusCode: 500,
          error: strings.SOMETHING_WENT_WRONG_ON_API_SERVER
        });
      });
  });
}
`

const functions = `import { Dimensions, Platform, PixelRatio, PermissionsAndroid } from 'react-native';
const IOS = Platform.OS === "ios";

const {
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const pixelRatio = PixelRatio.get();

// based on iphone X scale
const scale = SCREEN_WIDTH / (IOS ? 375 : 384);

export function normalize(size) {
	const newSize = size * scale
	if (Platform.OS === 'ios') {
		return Math.round(PixelRatio.roundToNearestPixel(newSize))
	} else {
		return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 3
	}
}
export async function requestRecordPermission() {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
		)
	} catch (err) {
		console.warn(err)
	}
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
}`

const indexUtils = `import STYLES from './styles';
import COLORS from './colors';
import { IconTypes } from './types';
import strings from './strings';
import { ArrayUtils } from './function';

export {
	STYLES,
	COLORS,
	IconTypes,
	strings,
	ArrayUtils
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
import {
  NetInfo
} from "react-native";

export default class NetworkTracker {
  constructor(store) {
    this.reduxStore = store
  }

  startTracking() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );
  }

  stopTracking() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  _handleConnectivityChange = isConnected => {
    console.log("_handleConnectivityChange isConnected: " + isConnected)
    this.reduxStore.dispatch(updateInternetConnectionState(isConnected))
  };
}
`

const indexHomePage = `import React, { PureComponent } from 'react';
import {  View, Text } from 'react-native';

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> HomePage </Text>
      </View>
    );
  }
}
`

const stylesHomePage = `
import { StyleSheet } from 'react-native';
import STYLES from '../../utils/styles';
import COLORS from '../../utils/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default styles;`

const indexContainers = `import HomePage from './HomePage';

export {
  HomePage,
}`

const indexRouter = `import { NavigationActions, createStackNavigator, createAppContainer } from 'react-navigation';
import { Animated, Easing } from 'react-native';
import { SCREEN_NAME } from '../utils/constants';

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
				duration: 100,
				easing: Easing.out(Easing.poly(4)),
				timing: Animated.timing
			},
			screenInterpolator: (sceneProps) => {
				const { layout, position, scene } = sceneProps;
				const { index } = scene;
				const height = layout.initHeight;
				const translateX = 0;
				const translateY = 0;
				const opacity = position.interpolate({
					inputRange: [index - 0.5, index],
					outputRange: [0.5, 1],
					extrapolate: 'clamp'
				});
				return { opacity, transform: [{ translateY }, { translateX }] };
			}
		})
	});
const navigateOnce = (getStateForAction) => (action, state) => {
	const { type, routeName } = action;
	if (state &&
		type === NavigationActions.NAVIGATE &&
		routeName === state.routes[state.routes.length - 1].routeName) {
		const newRoutes = state.routes.slice(0, state.routes.length - 1);
		const newIndex = newRoutes.length - 1;
		return getStateForAction(action, { index: newIndex, routes: newRoutes });
	}
	return getStateForAction(action, state);
};
Router.router.getStateForAction = navigateOnce(Router.router.getStateForAction);
export default createAppContainer(Router);

`

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

const indexStoresThunk = `import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reactotron from "../../debugging/ReactotronConfig";

import reducer from './reducers';

const middlewares = applyMiddleware(thunk);

// mount it on the Store
const Store = __DEV__ ?
  Reactotron.createStore(
    reducer,
    middlewares
  ) : createStore(
    reducer,
    middlewares
  )

export default Store;`

const indexStoresSaga = `import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import Reactotron from 'reactotron-react-native';
import Reactotron from '../../debugging/ReactotronConfig';

import reducer from './reducers';
import rootSaga from './sagas';

// create our new saga monitor
const sagaMonitor = Reactotron.createSagaMonitor()

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

// mount it on the Store
const Store = __DEV__ ?
  Reactotron.createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
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
      buttonShadow: {
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: { height: 1, width: 0 },
      },
      activeBackgroundColor: '#118303',
      inactiveBackgroundColor: '#9E9FA3',
      buttonRadius: 14,
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

    return (
      <View
        {...panHandlers}
        style={[{ padding: this.padding, position: 'relative' }, this.props.style]}>
        <View
          style={{
            backgroundColor: this.state.state ? this.props.activeBackgroundColor : this.props.inactiveBackgroundColor,
            height: this.props.switchHeight,
            width: this.props.switchWidth,
            borderRadius: this.props.switchHeight / 2,
            borderColor: this.state.state ? "#118303" : '#118303',
            borderWidth: this.state.state ? 0 : 1
          }} />
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
            left: this.props.switchHeight / 2 > this.props.buttonRadius ? halfPadding : halfPadding + this.props.switchHeight / 2 - this.props.buttonRadius,
            transform: [{ translateX: this.state.position }]
          },
          this.props.buttonShadow]}
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
              (props.buttonText) && (
                <Text
                  style={groupStyle([styles.buttonTextContent, props.buttonTextContentStyle])}
                  numberOfLines={props.numberOfLines}>
                  {props.buttonText}
                </Text>
              )
            }
            {
              (props.source) && (
                <Animated.Image
                  style={groupStyle([styles.buttonImage, props.buttonImageStyle])}
                  source={props.source}
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

const lableComponents = `import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Text } from 'react-native';

import STYLES from '../../../utils/styles';

import { groupStyle } from '../../../utils/functions';


const H = ({
  children, style, textStyle, color
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text style={groupStyle([styles.textStyle, textStyle, { color }])}>{children}</Text>
    </View>
  );

const H1 = ({
  children, style, textStyle, color
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text style={groupStyle([styles.textStyle1, textStyle, { color }])}>{children}</Text>
    </View>
  );

const H2 = ({
  children, style, textStyle, color
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text style={groupStyle([styles.textStyle2, textStyle, { color }])}>{children}</Text>
    </View>
  );

const H3 = ({
  children, style, textStyle, color
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text style={groupStyle([styles.textStyle3, textStyle, { color }])}>{children}</Text>
    </View>
  );

const H4 = ({
  children, style, textStyle, color
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text style={groupStyle([styles.textStyle4, textStyle, { color }])}>{children}</Text>
    </View>
  );

const H5 = ({
  children, style, textStyle, color
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text style={groupStyle([styles.textStyle5, textStyle, { color }])}>{children}</Text>
    </View>
  );

const H6 = ({
  children, style, textStyle, color
}) => (
    <View style={groupStyle([styles.container, style])}>
      <Text style={groupStyle([styles.textStyle6, textStyle, { color }])}>{children}</Text>
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
  },
  textStyle2: {
    ...STYLES.H2,
  },
  textStyle3: {
    ...STYLES.H3,
  },
  textStyle4: {
    ...STYLES.H4,
  },
  textStyle5: {
    ...STYLES.H5,
  },
  textStyle6: {
    ...STYLES.H6,
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

export {
  getSpringAnimations,
  getTimingAnimations
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
  host: "localhost"
})
  .use(reactotronRedux())
  .use(trackGlobalErrors())
  .use(networking())
  .use(asyncStorage())
  .connect();

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
  .connect();



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

module.exports = {
  indexIcons,
  indexImages,
  indexAssets,
  buttonComponents,
  headerComponents,
  lableComponents,
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
  fetchs,
  asyncStorage,
  audioPlayer,
  networkTracker,
  types,
  ReactotronConfigSaga,
  ReactotronConfigThunk,
  appRoot,
  indexApp
}