import React from 'react'
import PropTypes from 'prop-types'
import { Results } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as resultsActionCreators from 'redux/modules/results'

class ResultsContainer extends React.Component {
  componentDidMount() {
    this.props.setAndHandleResultsListener()
  }
  render () {
    return (
      <Results
        isFetching={this.props.isFetching}
        error={this.props.error}
        sortedIds={this.props.sortedIds}
      />
    )
  }
}

ResultsContainer.propTypes = {
  setAndHandleResultsListener: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  sortedIds: PropTypes.array,
}

function mapStateToProps({results, users}) {
  return {
    isFetching: results.isFetching,
    error: results.error,
    sortedIds: results.sortedIds,
    authedId: users.authedId
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(resultsActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultsContainer)
