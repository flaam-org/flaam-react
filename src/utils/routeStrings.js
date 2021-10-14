export const routes = {
  LANDING_PAGE: '/landing-page',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FEED:'/',
  POST_IDEA:'/post/idea',
  PROFILE:'/profile',
  IDEA_DETAIL:(ideaId) => `/idea/detail/${ideaId ? ideaId : ":ideaId"}`
}