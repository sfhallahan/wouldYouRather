import React from 'react'
import PropTypes from 'prop-types'
import { Nav } from 'components'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'
import { connect } from 'react-redux'
import { firebaseAuth } from 'config/constants'
import { formatUserData } from 'helpers/utils'

class MainContainer extends React.Component {
  componentDidMount() {
    firebaseAuth.onAuthStateChanged((user) => {
      if(user) {
        this.props.fetchingUser()
        const uid = user.uid
        const userInfo = formatUserData(user)
        this.props.authUser(uid)
        this.props.fetchingUserSuccess(uid, userInfo, Date.now())
        if (this.props.location.pathname === '/' || this.props.location.pathname === '/auth') {
          this.context.router.history.replace('results')
        } else {
          this.props.removeFetchingUser()
        }
      }
    })
  }
  render () {
    return (
      <Nav
        isAuthed={this.props.isAuthed}
        handleLogout={this.props.logoutAndUnauth}
       />
    )
  }
}

MainContainer.propTypes ={
  isAuthed: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  logoutAndUnauth: PropTypes.func.isRequired,
}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapStateToProps({users}) {
  return {
    isAuthed: users.isAuthed,
    isFetching: users.isFetching,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(usersActionCreators, dispatch),
)(MainContainer)
