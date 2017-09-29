const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_DECISION_TEXT = 'UPDATE_DECISION_TEXT'
const TITLE = 'title'
const OPTION_ONE = 'optionOne'
const OPTION_TWO = 'optionTWo'

function openModal() {
  return {
    type: OPEN_MODAL,
  }
}

function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

function updateDecisionText(field, text) {
  return {
    type: UPDATE_DECISION_TEXT,
    feild,
    text,
  }
}

// reducers

function modalText(state={}, action) {
  switch (field) {
    case TITLE:
      return {
        ...state,
        titleText: text,
      }
    case OPTION_ONE:
      return {
        ...state,
        titleText: text,
      }
    case OPTION_TWO:
      return {
        ...state,
        titleText: text,
      }
    default:
      return state

  }
}

const initialState = {
  isOpen: false,
  titleText: '',
  optionOneText: '',
  optionTwoText: '',
}

export default function modal(state=initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      }
    case UPDATE_DECISION_TEXT: modalText(state, action)
    default:
      return state
  }
}
