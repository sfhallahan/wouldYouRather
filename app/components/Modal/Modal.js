import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'material-ui'
import AddIcon from 'material-ui-icons/Add';

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  titleText: PropTypes.string.isRequired,
  optionOneText: PropTypes.string.isRequired,
  optionTwoText: PropTypes.string.isRequired,

}


export default function Modal (props) {
  return (
    <div>
      {props.isOpen === false
        ? <Button
            fab
            color="accent"
            aria-label="add">
            <AddIcon />
          </Button>
        : <p>{'MODAALLLLLLLL'}</p>
      }
    </div>
  )
}
