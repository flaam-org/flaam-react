export const host = "https://flaam-api.herokuapp.com/"

export const endpoints = {
  LOGIN_USER: `${host}api/v1/accounts/login`,
  SIGNUP_USER: `${host}api/v1/accounts/user`,
  VERIFY_TOKEN: `${host}api/v1/accounts/login/verify`,
  REFRESH_TOKEN: `${host}api/v1/accounts/login/refresh`,
  CHECK_EXISTS: `${host}api/v1/accounts/user/exists`,
  USER_PROFILE: `${host}api/v1/accounts/user/profile`
}