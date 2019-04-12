
export const asyncStorage = `
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

export const colors = `

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

export const styles = `import { Dimensions, Platform, PixelRatio } from "react-native";

import { normalize } from './function';
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

  // button film view
  widthButtonFilmView: (width * 0.85) / 2,
  heightButtonFilmView: height * 1 / 3.5,
  sizeButtonFilmView: {
    width: (width * 0.85) / 2,
    height: height * 1 / 3.5,
  },


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

export const constants = `const url_root = 'localhost:9091'

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
export const fetchs = `import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import { STATUS_CODE } from "./constants";
import strings from "./strings";

const timeOutDefault = 20000;
const AbortController = window.AbortController;

export const STATUS_CODE = {
  0: { status: false, message: 'skipped' },
  200: { status: true, message: 'OK' },
  201: { status: true, message: 'Created' },
  400: { status: false, message: '作成成功' },
  403: { status: false, message: '認証エラー(トークン不正)' },
  404: { status: false, message: 'Not found' },
  500: { status: false, message: 'Internal Server ErrorHTTPヘッダー' },
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

export function requestGetJsonContent(
  url,
  accessToken,
  timeOut: number = timeOutDefault
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
      headers: accessToken
        ? {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        }
        : {
          "Content-Type": "application/json"
        }
      ,
      signal: signal,
    });
    fetch(myRequest)
      .then(async (response) => {
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
        if (responseJson.status) { resolve(responseJson); } else { reject(responseJson) }
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

export function requestGetPagingContent(
  url,
  accessToken,
  timeOut: number = timeOutDefault
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
      headers: accessToken
        ? {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json"
        }
        : {
          "Content-Type": "application/json"
        }
      ,
      signal: signal,
    });
    fetch(myRequest)
      .then(async (response) => {
        if (STATUS_CODE[response.status].status) {
          const headers = response.headers
          let jsonObject = await response.json();
          if (typeof jsonObject == "string") {
            jsonObject = { message: jsonObject };
          }
          jsonObject["status"] = true;
          jsonObject["statusCode"] = response.status;

          var responseResult = { status: true, jsonContent: jsonObject, headers: headers }
          return responseResult;

        } else if (!STATUS_CODE[response.status].status) {
          return outputError(response);
        }
      })
      .then(responseJson => {
        clearTimeout(handleTimeOut);
        if (responseJson.status) {
          resolve(responseJson);
        }
        else {
          reject(responseJson)
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

export function requestPutJsonContent(
  url,
  jsonContent,
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
      method: "PUT",
      headers: accessToken
        ? {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
        : {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      body: jsonContent ? JSON.stringify(jsonContent) : null,
      signal: signal
    });
    fetch(myRequest)
      .then(async (response) => {
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
          reject(responseJson)
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

export function requestPostJsonContent(
  url,
  jsonContent,
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
      method: "POST",
      headers: accessToken
        ? {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
        : {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      body: jsonContent ? JSON.stringify(jsonContent) : null,
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
        resolve(responseJson);
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

export const functions = `import { Dimensions, Platform, PixelRatio, PermissionsAndroid } from 'react-native';
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

export function millisecondToTimeProgress(second) {

	const minute = Math.floor(second / 60);
	const secondBalance = Math.floor(second % 60);
	return minute + ':' + secondBalance;
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
}`

export const indexUtils = `import STYLES from './styles';
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

export const strings = `const strings = {
  REQUEST_TIME_OUT: 'request time out',
  SOMETHING_WENT_WRONG_ON_API_SERVER: 'something went wrong on api server',
}

export default strings;`

export const types = `const IconTypes = {
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
}`

export const indexHomePage = `import React, { PureComponent } from 'react';
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

export const stylesHomePage = `
import { StyleSheet } from 'react-native';
import STYLES from '../../utils/styles';
import COLORS from '../../utils/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default styles;`

export const indexContainers = `import HomePage from './HomePage';

export {
  HomePage,
}`

export const indexRouter = `import { NavigationActions, createStackNavigator, createAppContainer } from 'react-navigation';
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

export const appRoot = `import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import '../debugging/ReactotronConfig';
import { Provider } from "react-redux";
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

  componentDidMount() {
  }
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

export const initReducers = `const initialState = {
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

export const indexReducers = `import { combineReducers } from 'redux';
import init from './init';

const reducer = combineReducers({
  init,
})

export default reducer;
`

export const indexStores = `import { createStore, applyMiddleware, combineReducers } from 'redux';
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

export const initSagas = `function* loginSaga() {
  
}`

export const indexSagas = `import { all } from 'redux-saga/effects';


function* rootSaga() {
  yield all([
  ])
}

export default rootSaga;
`

export const indexAssets = `import {
} from './data';

import ICONS from "./icons";
import IMAGES from "./images";

export {
  ICONS,
  IMAGES,
}`

export const indexImages = `const IMAGES = {
}
export default IMAGES;`
export const indexIcons = `const ICONS = {
}
export default IMAGES;`

export const indexComponents = `import Button from './Button';
import Header from './Header';
import List from './List';

export {
  Button,
  Header,
  List,
}`

export const buttonComponents = `import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text, Image, Animated } from 'react-native';

const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity)

const Button = (props) => {

  let NewStyle = [styles.container];
  if (Array.isArray(props.style)) {
    NewStyle = [styles.container, ...props.style];
  } else {
    NewStyle.push(props.style);
  }
  let buttonImageNewStyle = [styles.buttonImage];
  if (Array.isArray(props.buttonImageStyle)) {
    buttonImageNewStyle = [styles.buttonImage, ...props.buttonImageStyle];
  } else {
    buttonImageNewStyle.push(props.buttonImageStyle);
  }
  return (
    <TouchableOpacityAnimated
      onLongPress={() => props.onLongPress()}
      onPressIn={() => props.onPressIn()}
      onPressOut={() => props.onPressOut()}
      onPress={() => props.onPress()}
      style={NewStyle}
      {...props.touchableProps}>
      {
        (!props.children) && (
          <View style={[styles.buttonContentStyle, props.buttonContentStyle]}>
            {
              (props.buttonText) && (
                <Text
                  style={[styles.buttonTextContent, props.buttonTextContentStyle]}
                  numberOfLines={props.numberOfLines}>
                  {props.buttonText}
                </Text>
              )
            }
            {
              (props.source) && (
                <Animated.Image
                  style={buttonImageNewStyle}
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

export const headerComponents = `import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import STYLES from '../../../utils/styles';

export const Header = (props) => {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
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

export const listComponents = `import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import STYLES from '../../../utils/styles';
import COLORS from '../../../utils/colors';

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
      <View style={[styles.container, style]}>
        {titleList && <Text style={[styles.titleListStyle, titleListStyle]}>{titleList}</Text>}
        <View style={[styles.listContainer, listContainer]}>
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

export const configAnimations = `import { Animated, Easing } from 'react-native';


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

export const indexConfigs = `import * as Animations from './Animations';


export {
  Animations,
}`

export const ReactotronConfig = `import Reactotron, {
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

export const indexApp = `/**
* @format
*/

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
`
