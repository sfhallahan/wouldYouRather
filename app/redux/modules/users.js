import { auth, saveUser, logout } from 'helpers/auth'
import { formatUserData } from 'helpers/utils'
import { fetchUser } from 'helpers/api'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const FETCHING_USER_ERROR = 'FETCHING_USER_ERROR'
const ADD_USER_DECISION = 'ADD_USER_DECISION'
const ADD_MULTIPLE_USER_DECISIONS = 'ADD_MULTIPLE_USER_DECISIONS'

export function authUser(uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

export function unauthUser() {
  return {
    type: UNAUTH_USER,
  }
}

export function fetchingUser() {
  return {
    type: FETCHING_USER,
  }
}

export function removeFetchingUser() {
  return {
    type: REMOVE_FETCHING_USER,
  }
}

export function fetchingUserError(error) {
  console.warn(error)
  return {
    type: FETCHING_USER_ERROR,
    error: 'Error fetching user',
  }
}

export function fetchingUserSuccess(uid, user) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp: Date.now(),
  }
}

export function addUserDecision(decisionId, optionChosen) {
  return {
    type: ADD_USER_DECISION,
    decisionId,
    optionChosen,
  }
}

function addMultipleUserDecisions(decisionId, decsionsMade) {
  // TODO come back and update to populate state with user decisions
}

// Thunk for unauthedUsers
export function fetchAndHandleAuthUser() {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth().then(({user, credential}) => {
      const uid = user.uid
      const userData = formatUserData(uid, user)
      return dispatch(fetchingUserSuccess(uid, userData))
    })
    .then(({user}) => saveUser(user))
    .then((user) => {
      dispatch(authUser(uid))})
    .catch((error) => dispatch(fetchingUserError(error)))
  }
}

export function fetchAuthedUserData(userId) {
  return function (dispatch, getState) {
    dispatch(fetchingUser())
    return fetchUser(userId)
      .then((user) => {
        dispatch(fetchingUserSuccess(userId, user))
        dispatch(authUser(userId))
      })
      .catch((error) => fetchingUserError(error))
  }
}

export function logoutAndUnauth () {
  return function (dispatch) {
    logout()
    dispatch(unauthUser())
  }
}

// Reducers
const initialUserState = {
  info: [],
  lastUpdated: 0,
  decisionsMade: []
}

function user(state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        ...action.user,
        lastUpdated: action.timestamp,
      }
    case ADD_USER_DECISION:
      return {
        ...state,
        decisionsMade: {
          ...state.decisionsMade,
          [action.decisionId]: action.optionChosen
        }
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

export default function users(state=initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      }
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case REMOVE_FETCHING_USER:
      return {
        ...state,
        isFetching: false,
      }
    case FETCHING_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: user(state[action.uid], action),
      }
    case ADD_USER_DECISION:
      return {
        ...state,
        [state.authedId]: user(state[state.authedId], action)
      }
    default:
      return state
  }
}
