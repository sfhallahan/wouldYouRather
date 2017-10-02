import { saveDecision, updateDecision, saveToUserDecisions } from 'helpers/api'
import { closeModal } from 'redux/modules/modal'
import { addUserDecision } from 'redux/modules/users'

const FETCHING_DECISIONS = 'FETCHING_DECISIONS'
const FETCHING_DECISIONS_SUCCESS = 'FETCHING_DECISIONS_SUCCESS'
const FETCHING_DECISIONS_ERROR = 'FETCHING_DECISIONS_ERROR'
const ADD_DECISION = 'ADD_DECISION'
const REMOVE_FETCHING = 'REMOVE_FETCHING'
const ADD_MULTIPLE_DECISIONS = 'ADD_MULTIPLE_DECISIONS'

const ADD_VOTE = 'ADD_VOTE'
const REMOVE_VOTE = 'REMOVE_VOTE'

function fetchingDecisions() {
  return {
    type: FETCHING_DECISIONS,
  }
}

function removeFetching() {
  return {
    type: REMOVE_FETCHING,
  }
}

function fetchingDecisionsSuccess(decisions){
  return {
    type: FETCHING_DECISIONS_SUCCESS,
    decisions,
  }
}

function fetchingDecisionsError (error) {
  console.warn(error)
  return {
    type: FETCHING_DECISIONS_ERROR,
    error: 'Error fetching decisions'
  }
}

function addDecision(decision) {
  return {
    type: ADD_DECISION,
    decision,
  }
}

export function addMultipleDecisions(decisions) {
  return {
    type: ADD_MULTIPLE_DECISIONS,
    decisions,
  }
}


function addVote(decisionId, optionChosen) {
  return {
    type: ADD_VOTE,
    decisionId,
    optionChosen,
  }
}

function removeVote(decisionId, optionChosen) {
  return {
    type: REMOVE_VOTE,
    decisionId,
    optionChosen,
  }
}


// Thunk for saving a single decision
export function decisionFanOut(decision) {
  return function (dispatch) {
    dispatch(fetchingDecisions())
    saveDecision(decision)
      .then((decisionWithId) =>{
        dispatch(addDecision(decisionWithId))
        dispatch(closeModal())
      })
      .catch((error) => {
        console.warn('Error in decisionFanOut: ' , error)
        dispatch(removeFetching())
      })
  }
}

// Thunk for votes
export function voteFanOut(decisionId, optionChosen) {
  return function(dispatch, getState) {
    const authedUser = getState().users.authedId
    const usersPrevDecision = getState().users[authedUser].decisionsMade[decisionId]

    // Handle users that are swtiching votes
    if( typeof usersPrevDecision === 'undefined') {
      dispatch(addVote(decisionId, optionChosen))
    }
    else if (usersPrevDecision === optionChosen) {
      return
    }
    else {
      dispatch(addVote(decisionId, optionChosen))
      dispatch(removeVote(decisionId, optionChosen - 1)) // this is brittle, fix it later (if statement in reducer users === 1)
    }

    dispatch(addUserDecision(decisionId, optionChosen))
    Promise.all([
      updateDecision(getState().decisions.decisions[decisionId]),
      saveToUserDecisions(authedUser, {[decisionId]: optionChosen})
    ]).catch((error) => console.warn('Error updateing vote: ', error))

  }
}


// vote reducer (this is a mess, come back an refactor when you have time)

function votes (state={}, action) {
  switch (action.type) {
    case ADD_VOTE:
      if(action.optionChosen === 1) {
        return {
          ...state,
          firstOption: {
            ...state.firstOption,
            selectedCount: state.firstOption.selectedCount + 1
          }
        }
      } else {
        return {
          ...state,
          secondOption: {
            ...state.secondOption,
            selectedCount: state.secondOption.selectedCount + 1
          }
        }
      }
    case REMOVE_VOTE:
      if(action.optionChosen === 1) {
        return {
          ...state,
          firstOption: {
            ...state.firstOption,
            selectedCount: state.firstOption.selectedCount - 1
          }
        }
      } else {
        return {
          ...state,
          secondOption: {
            ...state.secondOption,
            selectedCount: state.secondOption.selectedCount - 1
          }
        }
      }
    default:
      return state
  }
}

// invidual decisions reducer
function decision(state={}, action) {
  switch (action.type) {

    case ADD_DECISION:
      return {
        ...state,
        [action.decision.decisionId]: action.decision
      }
    case REMOVE_VOTE:
    case ADD_VOTE:
      return {
        ...state,
        [action.decisionId]: votes(state[action.decisionId], action)
      }
    default:
      return state
  }
}


const initialState = {
  isFetching: false,
  lastUpdated: 0,
  error: '',
  decisions: null,
}

export default function decisions(state=initialState, action) {
  switch (action.type) {
    case FETCHING_DECISIONS:
      return {
        ...state,
        isFetching: true,
      }
    case ADD_DECISION:
      return {
        ...state,
        isFetching: false,
        decisions: decision(state.decisions, action)
      }
    case ADD_MULTIPLE_DECISIONS:
      return {
        ...state,
        isFetching: false,
        decisions: {
          ...state.decisions,
          ...action.decisions,
        }
      }
    case REMOVE_FETCHING:
      return {
        ...state,
        isFetching: false,
      }
    case ADD_VOTE:
    case REMOVE_VOTE:
      return {
        ...state,
        decisions: decision(state.decisions, action)
      }
    default:
      return state
  }
}
