import React from 'react'
import PropTypes from 'prop-types'
import { ModalContainer } from 'containers'
import { resultsContainer, subHeader } from './styles.css'
import { CircularProgress } from 'material-ui/Progress';
import { DecisionContainer } from 'containers'

Results.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  sortedIds: PropTypes.array,
}


export default function Results (props) {
  return (
    <div className={resultsContainer}>
      {props.isFetching === true
        ? <div className={resultsContainer}>
            <h2 className={subHeader}>{'Loading decisions'}</h2>
            <CircularProgress color="accent" size={50} />
          </div>
        : <div>
            {props.sortedIds.length === 0
              ? <h2 className={subHeader}>{'Looks like there are no decisions yet'}</h2>
              : <div>
                  <h2 className={subHeader}>{'Decisions'}</h2>
                  {props.sortedIds.map((id) => (<DecisionContainer key={id} decisionId={id}/>))}
                </div>

            }
          </div>
        }
      <ModalContainer />
    </div>
  )
}
