import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, LinearProgress } from 'material-ui'
import AddIcon from 'material-ui-icons/Add';
import { modalContainer, addDecisionBtnContainer, formContainer, textArea, titleText } from './styles.css'
import { formatDecision } from 'helpers/utils'


Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  titleText: PropTypes.string.isRequired,
  optionOneText: PropTypes.string.isRequired,
  optionTwoText: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateDecisionText: PropTypes.func.isRequired,
  authedUser: PropTypes.object.isRequired,
  validInput: PropTypes.bool.isRequired,
  decisionFanOut: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}


export default function Modal (props) {

  function handleSubmit() {
    props.decisionFanOut(formatDecision(props.authedUser, props.titleText, props.optionOneText, props.optionTwoText))
  }

  return props.isOpen === false
        ? <div className={addDecisionBtnContainer}>
            <Button
              fab
              color="accent"
              aria-label="add"
              onClick={props.openModal}>
              <AddIcon />
            </Button>
          </div>
        : <Dialog
            open={props.isOpen}
            ignoreBackdropClick
            ignoreEscapeKeyUp
            className={modalContainer}>
            <DialogTitle>{`Add New "Would You Rather"`}</DialogTitle>
            <div >
            <DialogContent className={formContainer}>
              <TextField
                id="titleText"
                label="Title"
                margin="normal"
                className={titleText}
                onChange={(e) => props.updateDecisionText('title', e.target.value)}
              />
              <TextField
                id="optionOne"
                label="Would you rather..."
                margin="normal"
                value={props.optionOneText}
                multiline
                rows="2"
                className={textArea}
                onChange={(e) => props.updateDecisionText('optionOne', e.target.value)}
              />
              <TextField
                id="titleText"
                label="Or..."
                margin="normal"
                value={props.optionTwoText}
                multiline
                rows="2"
                className={textArea}
                onChange={(e) => props.updateDecisionText('optionTwo', e.target.value,)}
              />
            </DialogContent>
            </div>
            <DialogActions>
              <Button onClick={props.closeModal} color="primary">
                Cancel
              </Button>
              <Button disabled={!props.validInput || props.isSubmitting} onClick={handleSubmit} color="primary">
                Ok
              </Button>
            </DialogActions>
            {props.isSubmitting === true ? <LinearProgress /> : null }
          </Dialog>
}
