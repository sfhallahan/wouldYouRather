import React from 'react'
import PropTypes from 'prop-types'
import { Auth } from 'components'
import * as userActionCreators from 'redux/modules/users'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class AuthContainer extends React.Component {
  render () {
    return (
      <Auth
        isFetching={this.props.isFetching}
        error={this.props.error}
        handleAuth={(e) => {
          e.preventDefault()
          this.props.fetchAndHandleAuthUser()
                    .then(() => this.context.router.history.replace('results'))
        }}
      />
    )
  }
}

AuthContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthUser: PropTypes.func.isRequired,
}

AuthContainer.contextTypes = {
    router: PropTypes.object.isRequired,
}

function mapStateToProps({users}) {
  return {
    isFetching: users.isFetching,
    error: users.error,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthContainer)
