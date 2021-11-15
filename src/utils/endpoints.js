import { host } from './constants';

const endpointInitial = `${host}api/v1`

export const endpoints = {
  // authentication
  LOGIN_USER: `${endpointInitial}/accounts/login`,
  SIGNUP_USER: `${endpointInitial}/accounts/users`,
  VERIFY_TOKEN: `${endpointInitial}/accounts/login/verify`,
  REFRESH_TOKEN: `${endpointInitial}/accounts/login/refresh`,
  CHECK_EXISTS: `${endpointInitial}/accounts/user/exists`,
  OBTAIN_RESET_TOKEN: `${endpointInitial}/accounts/password/reset`,
  VALIDATE_RESET_TOKEN: (uidb64, token) => `${endpointInitial}/accounts/password/reset/${uidb64}/${token}`,
  RESET_NEW_PASSWORD: (uidb64, token) => `${endpointInitial}/accounts/password/reset/${uidb64}/${token}`,

  //user
  USER_PROFILE: `${endpointInitial}/accounts/user/profile`,
  PUBLIC_USER: (username) => `${endpointInitial}/accounts/user/${username}`,

  //tags
  FAVOURITE_TAGS: `${endpointInitial}/tags`,

  // ideas
  GET_POST_IDEA: `${endpointInitial}/ideas`,
  SINGLE_IDEA: (ideaId) => `${endpointInitial}/idea/${ideaId}`,
  ADD_IDEA_TO_BOOKMARKS: (ideaId) => `${endpointInitial}/idea/${ideaId}/bookmark`,
  DELETE_IDEA_FROM_BOOKMARKS: (ideaId) => `${endpointInitial}/idea/${ideaId}/bookmark`,
  VOTE_IDEA: (ideaId) => `${endpointInitial}/idea/${ideaId}/vote`,

  //implementations
  GET_POST_IMPLEMENTATIONS: `${endpointInitial}/implementations`,
  SINGLE_IMPLEMENTATION: (id) => `${endpointInitial}/implementation/${id}`,
  VOTE_SINGLE_IMPLEMENTATION: (id) => `${endpointInitial}/implementation/${id}/vote`,
  ACCEPT_SINGLE_IMPLEMENTATION: (id) => `${endpointInitial}/implementation/${id}/accept`,
  VALIDATE_SINGLE_IMPLEMENTATION: (id) => `${endpointInitial}/implementation/${id}/validate`,

  // discussions
  GET_POST_DISCUSSIONS: `${endpointInitial}/discussions`,
  SINGLE_DISCUSSION: (discussionId) => `${endpointInitial}/discussion/${discussionId}`,
  VOTE_SINGLE_DISCUSSION: (discussionId) => `${endpointInitial}/discussion/${discussionId}/vote`,

  // discussion comments
  GET_POST_DISCUSSION_COMMENT: `${endpointInitial}/discussion/comments`,
  SINGLE_DISCUSSION_COMMENT: (discussionCommentId) => `${endpointInitial}/discussion/comments/${discussionCommentId}`
}