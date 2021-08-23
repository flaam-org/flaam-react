export const host = "http://127.0.0.1:8000/"

export const endpoints = {
  LOGIN_USER: `${host}api/v1/accounts/login`,
  SIGNUP_USER: `${host}api/v1/accounts/user`,
  VERIFY_TOKEN: `${host}api/v1/accounts/login/verify`,
  REFRESH_TOKEN: `${host}api/v1/accounts/login/refresh`
}