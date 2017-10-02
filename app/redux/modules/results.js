import { addListener } from 'redux/modules/listeners'
import { addDecision, addMultipleDecisions } from 'redux/modules/decisions'
import { addExpandKey } from 'redux/modules/expanded'
import { listenToResults } from 'helpers/api'

const SETTING_RESULTS_LISTENER = 'SETTING_RESULTS_LISTENER'
const SETTING_RESULTS_LISTENER_ERROR = 'SETTING_RESULTS_LISTENER_ERROR'
const SETTING_RESULTS_LISTENER_SUCCESS = 'SETTING_RESULTS_LISTENER_SUCCESS'

function settingResultsListener() {
  return {
    type: SETTING_RESULTS_LISTENER,
  }
}

function settingResultsListenerError(error) {
  console.warn(error)
  return {
    type: SETTING_RESULTS_LISTENER_ERROR,
    error: 'Error fetching results',
  }
}

function settingResultsListenerSuccess(decisionIds) {
  return {
    type: SETTING_RESULTS_LISTENER_SUCCESS,
    decisionIds,
  }
}

export function setAndHandleResultsListener() {
  let initialFetch = true
  return function (dispatch, getState) {
    if(getState().listeners.results === true) {
      return
    }
    dispatch(addListener('results'))
    dispatch(settingResultsListener())

    listenToResults(({decisions, sortedIds}) => {
      dispatch(addMultipleDecisions(decisions))
      initialFetch === true
      ? dispatch(settingResultsListenerSuccess(sortedIds))
      : dispatch(addDecision(decisions[sortedIds[0]]))
    }, (error) => dispatch(settingResultsListenerError(error)))
  }
}

const initialState = {
  isFetching: false,
  error: '',
  sortedIds: [],
}

export default function results(state=initialState, action) {
  switch (action.type) {
    case SETTING_RESULTS_LISTENER:
      return {
        ...state,
        isFetching: true,
      }
    case SETTING_RESULTS_LISTENER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        sortedIds: action.decisionIds,
      }
    case SETTING_RESULTS_LISTENER_ERROR:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
