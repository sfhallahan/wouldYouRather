import React from 'react'
import PropTypes from 'prop-types'
import { centeredContainer, subHeader } from 'sharedStyles/styles.css'

export default function Logout (props) {
  return (
    <div className={centeredContainer}>
      <h2 className={subHeader}>{'You have been successfully logged out'}</h2>
    </div>
  )
}
