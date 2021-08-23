function get(url, isPrivate) {
  const requestOptions = {
    method: 'GET',
    headers: setHeaders(isPrivate),
  }

  return fetch(url, requestOptions)
}





function post(url, body, isPrivate) {
  const requestOptions = {
    method: 'POST',
    headers: setHeaders(isPrivate),
    body: JSON.stringify(body)
  }

  return fetch(url, requestOptions)
}





function put(url, body, isPrivate) {

  const requestOptions = {
    method: 'PUT',
    headers: setHeaders(isPrivate),
    body: JSON.stringify(body)
  }

  return fetch(url, requestOptions)
}




function _delete(url, isPrivate) {

  const requestOptions = {
    method: 'DELETE',
    headers: setHeaders(isPrivate),
  }

  return fetch(url, requestOptions)

}



/**
 *
 * @param {boolean} isPrivate
 * @returns headers object
 */
function setHeaders(isPrivate) {

  const HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }


  if (isPrivate) {

    const accessToken = localStorage.getItem("access_token")

    if (typeof accessToken !== "undefined" && accessToken !== null)
      return {
        ...HEADERS,
        "Authorization": accessToken
      }
  }

  return HEADERS
}




export const fetchWrapper = {
  get,
  post,
  put,
  _delete
}