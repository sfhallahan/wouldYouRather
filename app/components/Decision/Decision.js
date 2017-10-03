import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, Avatar, CardContent,
  Typography, withStyles, Divider, CardActions, IconButton } from 'material-ui'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import CheckCircle from 'material-ui-icons/CheckCircle'
import PanoramaFishEye from 'material-ui-icons/PanoramaFishEye'
import { formatTimestamp, calculateVotingResults } from 'helpers/utils'
import { cardContainer, cardContentContainer, voteContainer, check, checkContainer,
  optionsContainer, singleOptionContainer, wyrStatement, cardActions } from './styles.css'


Option.propTypes = {
  option: PropTypes.object.isRequired,
  percentage: PropTypes.number.isRequired,
  userVote: PropTypes.bool.isRequired,
}

function Option ({option, percentage, userVote}) {
  return (
    <div>
      <Typography>{option.text}</Typography>
      <h4>{`${percentage} %`}</h4>
      <div className={voteContainer}>
        <div className={checkContainer}>
          {userVote === true ? <CheckCircle className={check} /> : null}
        </div>
        <Typography>{option.selectedCount} votes</Typography>
      </div>
    </div>
  )
}

function Decision (props) {
  const { author, timestamp, title, firstOption, secondOption, decisionId} = props.decision
  const votingResults = calculateVotingResults(firstOption, secondOption)
  function handleExpand() {
    if(props.isExpanded === false) {
      props.expandDecision(decisionId)
    } else {
      props.collapseDecision(decisionId)
    }
  }

  return (
    <div className={cardContainer} style={{borderLeftColor:votingResults.borderColor}}>
      <Card>
        <CardHeader
          classes={{title: props.classes.title}}
          avatar={<Avatar aria-label={`${author.name}'s picture'`} src={author.avatar} />}
          title={title}
          subheader={`${formatTimestamp(timestamp)} by ${author.name}`}
        />
        <CardActions className={cardActions}>
          {props.hasVoted === true
            ? <IconButton color='primary'><CheckCircle className={check} /></IconButton>
            : <IconButton><PanoramaFishEye /></IconButton>
          }

          <IconButton
              onClick={handleExpand}
              aria-label="Show more">
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        <Collapse in={props.isExpanded} transitionDuration='auto'>
        <Divider inset />
        <CardContent className={cardContentContainer}>
          <h3 className={wyrStatement}>{'Would you rather...'}</h3>
          <div className={optionsContainer}>
            <div
              className={singleOptionContainer}
              style={{borderColor:'#3f51b5'}}
              onClick={() => props.voteFanOut(decisionId, 1)}>
              <Option
                option={firstOption}
                percentage={votingResults.percentageOne}
                userVote={props.userVote === 1 ? true : false}
                />
            </div>
            <Typography>{'or'}</Typography>
            <div
              className={singleOptionContainer}
              style={{borderColor:'#ff4081'}}
              onClick={() => props.voteFanOut(decisionId, 2)}>
              <Option
                option={secondOption}
                percentage={votingResults.percentageTwo}
                userVote={props.userVote === 2 ? true : false}
                />
            </div>
          </div>
        </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}

Decision.propTypes = {
  decision: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  collapseDecision: PropTypes.func.isRequired,
  expandDecision: PropTypes.func.isRequired,
  voteFanOut: PropTypes.func.isRequired,
  userVote: PropTypes.number.isRequired,
}




// classes style override for material-ui to get at title element of CardHeader

const styles = {
  title: {
    fontSize: '18px',
  }
}

export default withStyles(styles)(Decision)
