import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import { MainContainer, HomeContainer, AuthContainer,
          LogoutContainer, ResultsContainer } from 'containers'

export default function getRoutes(checkAuth, history) {
  return (
    <Router history={history}>
      <div>
        <Route path='/' component={MainContainer} />
        <Route exact path='/logout' component={LogoutContainer} />
        <PublicRoute exact path='/' component={HomeContainer} checkAuth={checkAuth} />
        <PublicRoute exact path='/auth' component={AuthContainer} checkAuth={checkAuth} />
        <PrivateRoute exact path='/results' component={ResultsContainer} checkAuth={checkAuth} />
      </div>
    </Router>
  )
}

function PrivateRoute ({component: Component, checkAuth, ...rest}) {
  const isAuthed = checkAuth()
  return (
    <Route
      {...rest}
      render={() => isAuthed === true
        ? <Component />
        : <Redirect to='/auth' />
      }
    />
  )
}

function PublicRoute ({component: Component, checkAuth, ...rest}) {
  const isAuthed = checkAuth()
  return (
    <Route
      {...rest}
      render={() => isAuthed === true
        ? <Redirect to='/results' />
        : <Component />
      }
    />
  )
}
