const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_DECISION_TEXT = 'UPDATE_DECISION_TEXT'
const TITLE = 'title'
const OPTION_ONE = 'optionOne'
const OPTION_TWO = 'optionTwo'

export function openModal() {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

export function updateDecisionText(field, text) {
  return {
    type: UPDATE_DECISION_TEXT,
    field,
    text,
  }
}







// reducers

function modalText(state, action) {
  switch (action.field) {
    case TITLE:
      return {
        ...state,
        titleText: action.text,
      }
    case OPTION_ONE:
      return {
        ...state,
        optionOneText: action.text,
      }
    case OPTION_TWO:
      return {
        ...state,
        optionTwoText: action.text,
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
        titleText: '',
        optionOneText: '',
        optionTwoText: '',
      }
    case UPDATE_DECISION_TEXT:
      return modalText(state, action)
    default:
      return state
  }
}
