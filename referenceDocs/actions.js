// users actions
const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const FETCHING_USER_ERROR = 'FETCHING_USER_ERROR'

function authUser() {
  return {
    type: AUTH_USER,
  }
}

function unauthUser() {
  return {
    type: UNAUTH_USER,
  }
}


function fetchingUser() {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserError(error) {
  console.warn(error)
  return {
    type: FETCHING_USER_ERROR,
    error: 'Error fetching user',
  }
}

function fetchingUserSuccess(uid, user, timestamp, decisionsMade) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp: Date.now(),
  }
}
