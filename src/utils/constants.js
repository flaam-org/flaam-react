export const host = "https://flaam-api.herokuapp.com/"

export const endpoints = {
  LOGIN_USER: `${host}api/v1/accounts/login`,
  SIGNUP_USER: `${host}api/v1/accounts/user`,
  VERIFY_TOKEN: `${host}api/v1/accounts/login/verify`,
  REFRESH_TOKEN: `${host}api/v1/accounts/login/refresh`,
  CHECK_EXISTS: `${host}api/v1/accounts/user/exists`,
  USER_PROFILE: `${host}api/v1/accounts/user/profile`
}


export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)'
}