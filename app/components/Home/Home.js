import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import { header, homeContainer, subHeader } from './styles.css'

export default function Home (props) {
  return (
    <div className={homeContainer}>
        <h1 className={header}>{'Would You Rather'}</h1>
        <h4 className={subHeader}>{'The 100 year old American Classic'}</h4>
    </div>
  )
}
