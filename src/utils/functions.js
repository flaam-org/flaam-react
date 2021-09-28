export function joinClassNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const areTokensValid = () => {

  const access = localStorage.getItem('access_token')
  const refresh = localStorage.getItem('refresh_token')


  if (access && refresh) {
    const access_token = JSON.parse(localStorage.getItem('access_token'))
    const refresh_token = JSON.parse(localStorage.getItem('refresh_token'))

    if (!(!!access_token.token && !!refresh_token.token)) return false

    if (access_token.expires_at > new Date().getTime()) return true;
  }

  return false
}



/**
 *
 * @param {string} name key name
 * @param {string} token the token
 * @param {number} expiry milliseconds after which token expires
 */
 export function setTokenWithExpiry(name, token, expire_after) {

  localStorage.setItem(name, JSON.stringify({
    token: token,
    expires_at: new Date().getTime() + expire_after
  }))

}

export function getToken(name){

  const t = localStorage.getItem(name);
  return JSON.parse(t)?.token
}

export function getTokenExpiry(name) {
  const t = localStorage.getItem(name);
  return JSON.parse(t).expires_at

}