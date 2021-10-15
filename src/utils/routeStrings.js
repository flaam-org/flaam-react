export const routes = {
  LANDING_PAGE: '/landing-page',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SEND_RESET_TOKEN: "/send-reset-token",
  RESET_PASSWORD: "/reset-password",
  FEED: '/',
  POST_IDEA: '/post/idea',
  PROFILE: '/profile',
  IDEA_DETAIL: (ideaId) => `/idea/detail/${ideaId ? ideaId : ":ideaId"}`
}