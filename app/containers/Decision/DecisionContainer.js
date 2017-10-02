import React from 'react'
import PropTypes from 'prop-types'
import { Decision } from 'components'
import { connect } from 'react-redux'
import * as decisionsActionCreators from 'redux/modules/decisions'
import * as expandedActionCreators from 'redux/modules/expanded'
import { bindActionCreators } from 'redux'

class DecisionContainer extends React.Component {

  render () {
    return (
      <Decision
        decision={this.props.decision}
        isExpanded={this.props.isExpanded}
        expandDecision={this.props.expandDecision}
        collapseDecision={this.props.collapseDecision}
        voteFanOut={this.props.voteFanOut}
        hasVoted={this.props.hasVoted}
      />
    )
  }
}

DecisionContainer.propTypes = {
  decisionId: PropTypes.string.isRequired,
  expandDecision: PropTypes.func.isRequired,
  collapseDecision: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
  voteFanOut: PropTypes.func.isRequired,
  hasVoted: PropTypes.bool.isRequired,
}


function mapStateToProps({decisions, users, expanded}, props) {
  return {
    decision: decisions.decisions[props.decisionId],
    isExpanded: expanded[props.decisionId] || false,
    hasVoted: users[users.authedId].decisionsMade[props.decisionId] ? true : false
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      ...decisionsActionCreators,
      ...expandedActionCreators,
    }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DecisionContainer)
