export function formatUserData (uid, user) {
  return {
    info: {
      uid: user.uid,
      name: user.displayName,
      avatar: user.photoURL
    },
  }
}

export function formatDecision(user, title, optionOneText, optionTwoText) {
  return {
    author: user.info,
    title,
    timestamp: Date.now(),
    firstOption: {
      text: optionOneText,
      selectedCount: 0},
    secondOption: {
      text: optionTwoText,
      selectedCount: 0}
  }
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export function validateModalInput(title, optionOne, optionTwo) {
  if ( title.length <= 0 || title.length > 140) {
    return false
  } else if (optionOne.length <= 0 || optionOne.length > 140) {
    return false
  } else if (optionTwo.length <= 0 || optionTwo.length > 140) {
    return false
  } else {
    return true
  }
}

export function calculateVotingResults(firstOption, secondOption) {
  const votesOne = firstOption.selectedCount
  const votesTwo = secondOption.selectedCount
  const total = votesOne + votesTwo
  let borderColor = '#fafafa'
  if (votesOne > votesTwo) {
    borderColor = '#3f51b5'
  } else if (votesTwo > votesOne) {
    borderColor = '#ff4081'
  }


  if ( total === 0 ) {
    return {
      percentageOne: 0,
      percentageTwo: 0,
      borderColor,
    }
  } else {
    return {
      percentageOne: Math.round(votesOne/total * 100),
      percentageTwo: Math.round(votesTwo/total * 100),
      borderColor
    }
  }
}

export function removeIsExtendBeforeSave(decision) {
  const {decisionId, author, title, firstOption, secondOption, timestamp} = decision
  return {
    decisionId,
    author,
    title,
    firstOption,
    secondOption,
    timestamp,
  }

}
