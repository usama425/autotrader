import axios from 'axios';

import {store} from '../redux';

// const ROOT_URL = 'https://autotraders.alphanitesofts.net'; // dev server
const ROOT_URL = 'https://autotrader.com.gh'; // dev server
// const ROOT_URL = 'http://127.0.0.1:8002'; // dev server
const IMAGEURL = 'https://listingimages.autotrader.com.gh';
// const IMAGEURL = 'https://autotradersimages.alphanitesofts.net'
const MAKE_ICON_URL = 'https://makes.autotrader.com.gh';
const CATEGORY_ICON_URL = 'http://categories.autotrader.com.gh';
const PROFILEIMAGEURL = 'https://users-profile.autotrader.com.gh';
const PARTTYPEIMAGEURL = 'http://parts-accessories-listings.autotrader.com.gh';

const PARTSURL = 'https://listingimages.autotrader.com.gh';

const BASE_URL = `${ROOT_URL}/api`;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async config => {
    const requestConfig = config;
    const {authenticationToken} = store.getState().userSession;
    if (authenticationToken) {
      requestConfig.headers = {
        Authorization: `Bearer ${authenticationToken}`,
      };
    }
    return requestConfig;
  },
  err => {
    return Promise.reject(err);
  },
);

export {
  ROOT_URL,
  BASE_URL,
  client,
  IMAGEURL,
  MAKE_ICON_URL,
  CATEGORY_ICON_URL,
  PROFILEIMAGEURL,
  PARTTYPEIMAGEURL,
  PARTSURL,
};
