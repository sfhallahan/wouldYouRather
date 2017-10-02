import React from 'react'
import { Modal } from 'components'
import { connect } from 'react-redux'
import * as modalActionCreators from 'redux/modules/modal'
import * as decisionsActionCreators from 'redux/modules/decisions'
import { bindActionCreators } from 'redux'
import { validateModalInput } from 'helpers/utils'


function mapStateToProps({modal, users, decisions}) {
  return {
    isOpen: modal.isOpen,
    titleText: modal.titleText,
    optionOneText: modal.optionOneText,
    optionTwoText: modal.optionTwoText,
    authedUser: users[users.authedId],
    validInput: validateModalInput(modal.titleText, modal.optionOneText, modal.optionTwoText),
    isSubmitting: decisions.isFetching,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...modalActionCreators,
    ...decisionsActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal)
