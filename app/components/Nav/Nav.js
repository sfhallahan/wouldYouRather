import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography, Button } from 'material-ui'
import { Link } from 'react-router-dom'
import { toolBar, navButtons } from './styles.css'

Nav.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default function Nav (props) {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={toolBar}>
          <div>
            <Typography type='title' color='inherit'>
              {'Would You Rather'}
            </Typography>
          </div>
          <div className={navButtons}>
            <Link to='/'><Button color="contrast">Home</Button></Link>
            {props.isAuthed === true
              ? <Link to='/logout'>
                  <Button color="contrast" onClick={props.handleLogout}>Logout</Button>
                </Link>
              : <Link to='/auth'><Button color="contrast">Login</Button></Link>
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
