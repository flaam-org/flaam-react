import { createSlice } from '@reduxjs/toolkit'
import { fetchWrapper } from '../utils/fetchWrapper'
import { endpoints, timeInMilliseconds } from "../utils/constants"
import { enqueueNotification } from './globalNotificationSlice'
import { checkTokenState, setTokenWithExpiry, tokenStates } from "../utils/functions"

const initialState = {
  isLoggedIn: checkTokenState() === tokenStates.VALID,
  loading: false,
  errors: {
    loginError: "",
    signupError: ""
  }
}


export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },

    setLoginError: (state, action) => {
      state.errors.loginError = action.payload
    },

    setSignupError: (state, action) => {
      state.errors.signupError = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    }

  }
})


export const { setIsLoggedIn, setLoginError, setSignupError, setLoading } = authSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loginAsync = (data) => async dispatch => {

  dispatch(setLoading(true))

  try {
    const res = await fetchWrapper.post(endpoints.LOGIN_USER, data)

    const resData = await res.json()

    if (res.ok) {

      setTokenWithExpiry('refresh_token', resData?.refresh, 89 * timeInMilliseconds.DAY);
      setTokenWithExpiry('access_token', resData?.access, 29 * timeInMilliseconds.MINUTE);

      dispatch(setIsLoggedIn(true))
      dispatch(enqueueNotification({
        msg: "Logged In Successfully.",
        type: "success",
        duration: 3000
      }))

    }

    if (res.status === 401) {
      dispatch(setLoginError(resData?.detail))
    }

  }
  catch (error) {
    console.log(error)
  }
  finally {
    dispatch(setLoading(false))
  }


}

export const manageLoginAsync = () => async dispatch => {

  if (checkTokenState() === tokenStates.PARTIAL) {

    const refresh = localStorage.getItem('refresh_token');

    if (typeof refresh === "undefined" || refresh === null) {
      dispatch(setIsLoggedIn(false))
      return
    }

    const refresh_token = JSON.parse(refresh);

    if (refresh_token.expires_at <= new Date().getTime()) {
      dispatch(setIsLoggedIn(false))
    }


    try {

      const newAccessRes = await fetchWrapper.post(endpoints.REFRESH_TOKEN, {
        "refresh": refresh_token
      })
      const data = await newAccessRes.json()

      if (newAccessRes.ok) {
        // localStorage.setItem('access_token', data?.access)
        setTokenWithExpiry('access_token', data?.access, 29 * timeInMilliseconds.MINUTE)
        dispatch(setIsLoggedIn(true))
        return
      }

      // if refresh token is also not valid return to login page
      dispatch(setIsLoggedIn(false))
      return

    }
    catch (err) {
      console.log(err);
    }
  }
}

export const signupAsync = (data) => async dispatch => {
  dispatch(setLoading(true))

  try {

    const res = await fetchWrapper.post(endpoints.SIGNUP_USER, data)

    const resData = await res.json()

    if (res.ok) {

      setTokenWithExpiry('refresh_token', resData?.refresh, 89 * timeInMilliseconds.DAY);
      setTokenWithExpiry('access_token', resData?.access, 29 * timeInMilliseconds.MINUTE);

      dispatch(setIsLoggedIn(true))

    }

    if (res.status === 400) {
      dispatch(setSignupError("some invalid values in the form"))
    }


  } catch (error) {
    console.log(error);

  } finally {
    dispatch(setLoading(false))
  }

}

export const logout = () => dispatch => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")


  dispatch(setIsLoggedIn(false))
  dispatch(setLoginError(""))
  dispatch(setSignupError(""))
  dispatch(setLoading(false))
  dispatch(enqueueNotification({
    msg: "Logged out successfully",
    type: "error",
    duration: 3000
  }))
}


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.login.value)`
// export const selectUserData = state => state.login.userDetails;
export const selectIsLoggedIn = state => state.auth.isLoggedIn
export const selectLoginError = state => state.auth.errors.loginError
export const selectSignupError = state => state.auth.errors.signupError
export const selectLoading = state => state.auth.loading

export default authSlice.reducer