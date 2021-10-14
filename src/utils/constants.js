export const host = "https://flaam-api.herokuapp.com/"
const endpointInitial = `${host}api/v1`

export const endpoints = {
  // authentication
  LOGIN_USER: `${endpointInitial}/accounts/login`,
  SIGNUP_USER: `${endpointInitial}/accounts/users`,
  VERIFY_TOKEN: `${endpointInitial}/accounts/login/verify`,
  REFRESH_TOKEN: `${endpointInitial}/accounts/login/refresh`,
  CHECK_EXISTS: `${endpointInitial}/accounts/user/exists`,
  OBTAIN_RESET_TOKEN:`${endpointInitial}/accounts/password/reset`,

  //user
  USER_PROFILE: `${endpointInitial}/accounts/user/profile`,

  //tags
  FAVOURITE_TAGS: `${endpointInitial}/tags`,

  // ideas
  GET_IDEAS: `${endpointInitial}/ideas`,
  POST_IDEA: `${endpointInitial}/ideas`,
  GET_SINGLE_IDEA: (ideaId) => `${endpointInitial}/idea/${ideaId}`,
  UPDATE_SINGLE_IDEA: (ideaId) => `${endpointInitial}/idea/${ideaId}`,
  DELETE_SINGLE_IDEA: (ideaId) => `${endpointInitial}/idea/${ideaId}`,
  ADD_IDEA_TO_BOOKMARKS: (ideaId) => `${endpointInitial}/idea/${ideaId}/bookmark`,
  DELETE_IDEA_FROM_BOOKMARKS: (ideaId) => `${endpointInitial}/idea/${ideaId}/bookmark`,
}


export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)'
}

export const timeInMilliseconds = {
  MINUTE: 60 * 1000,
  DAY: 24 * 60 * 60 * 1000
}