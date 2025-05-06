export const PRODUCTION = 'production';
export const DEVELOPMENT = 'development';
console.log(process.env.NODE_ENV);
export const isProduction = process.env.NODE_ENV === PRODUCTION;
// export const isProduction = true;
const url = isProduction ? 'https://picshareai.com/' : 'http://localhost:3001/';
// const url = 'http://localhost:3000/';
export const authApiUrl = url + 'api/users/';
export const uploadsServer = url + 'api/uploads/';
  