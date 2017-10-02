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

export function fetchingUserSuccess(uid, user, timestamp, decisionsMade) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
    decisionsMade,
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
      const userInfo = formatUserData(user)
      console.log(user)
      return dispatch(fetchingUserSuccess(uid, userInfo, Date.now()))
    })
    .then(({user}) => saveUser(user))
    .then((user) => dispatch(authUser(user.uid)))
    .catch((error) => dispatch(fetchingUserError(error)))
  }
}

/** TODO come back and update to populate state with user decisions
export function fetchUsersDecisions(decisionId) {
  return function (dipatch, getState) {
    const authedId = getState().users.authedId
    dispatch(fetchingUser())
    return fetchUser(authedId)
      .then(({decisionMade}) => {
        dispatch(addMultipleUserDecisions())
      })
  }
}
**/
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
        info: action.user,
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
