import React from 'react'
import { Modal } from 'components'
import { connect } from 'react-redux'


function mapStateToProps({modal}) {
  return {
    isOpen: modal.isOpen,
    titleText: modal.titleText,
    optionOneText: modal.optionOneText,
    optionTwoText: modal.optionTwoText,
  }
}

export default connect(
  mapStateToProps,
)(Modal)
