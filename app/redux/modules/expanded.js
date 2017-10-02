const EXPAND_DECISION = 'EXPAND_DECISION'
const COLLAPSE_DECISION ='COLLAPSE_DECISION'
const ADD_EXPAND_KEY = 'ADD_EXPAND_KEY'


export function expandDecision(decisionId) {
  return {
    type: EXPAND_DECISION,
    decisionId,
  }
}

export function collapseDecision(decisionId) {
  return {
    type: COLLAPSE_DECISION,
    decisionId,
  }
}

export function addExpandKey(decisionId) {
  return {
    type: ADD_EXPAND_KEY,
    decisionId,
  }
}



export default function expanded(state={}, action) {
  switch (action.type) {
    case EXPAND_DECISION:
      return {
        ...state,
        [action.decisionId]: true,
        }
    case COLLAPSE_DECISION:
      return {
        ...state,
        [action.decisionId]: false,
      }
    case ADD_EXPAND_KEY:
      return {
        ...state,
        [action.decisionId]: false,
      }
    default:
      return state
  }
}
