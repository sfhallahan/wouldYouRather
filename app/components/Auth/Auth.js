import React from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress } from 'material-ui'
import { subHeader } from 'sharedStyles/styles.css'
import { authContainer, btn } from './styles.css'

Auth.PropTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  handleAuth: PropTypes.func.isRequired,
}


export default function Auth (props) {
  return (
    <div className={authContainer}>
      <h2 className={subHeader}>{'Login with Facebook to Play!'}</h2>
        {props.isFetching === true
          ? <CircularProgress color="accent" />
          : <Button
              raised
              color="accent"
              className={btn}
              onClick={props.handleAuth}
            >{'Login with Facebook'}</Button>
        }
    </div>
  )
}
