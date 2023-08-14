const config = require('../../package.json');
const BACKEND_BASE_URL = config.projectConfig.backendApiBaseUrl;

const COUNTRY_FLAG = {
   BASE_URL: `https://flagsapi.com/`,
   SIZE: { 16: '16', 24: '24', 32: '32', 48: '48', 64: '64' },
   STYLE: { FLAT: 'flat', SHINY: 'shiny' },
};

const STATIC_IMAGE = {
   BASE_URL: `${BACKEND_BASE_URL}/images`,
   TYPE: { POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery', TOUR: 'tour' },
   SIZE: { SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait' },
   QUALITY: { SD: 'sd', HD: 'hd' },
};

const BACKEND_API = {
   BASE_URL: `${BACKEND_BASE_URL}/api`,
   REGISTER: '/register',
   LOGIN: '/login',
   USER_EXIST: '/user-exist',
   USER: '/user',
   REFRESH_TOKEN: '/refresh-token',
   RESTAURANT: '/restaurant',
   CART: '/cart',
   TOUR: '/tour',
   FAVORITE: '/favorite',
   SEARCH: '/search',
   PAYMENT: '/payment',
   BOOKING: '/booking',
};

export default { COUNTRY_FLAG, BACKEND_API, STATIC_IMAGE };
