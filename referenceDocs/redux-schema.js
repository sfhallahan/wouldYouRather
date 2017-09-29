{
  users: {
    isFetching,
    error,
    isAuthed,
    authedId,
    [userId] : {
      lastUpdated:
      info: {
        userId,
        name,
        avatar,
      },
      decisionsMade: [decisionId, decisionId]
    }
  },
  remainingDecisions: [decisionId, decisionId],

  decisions: {
    lastUpdated,
    isFetching,
    error,
    decisions: {
      [decisionId]: {
        author,
        timestamp,
        title,
        firstOption: {
          text,
          selectedCount,
        },
        secondOption: {
          text,
          selectedCount,
        }
      }
    }
  },
  modal: {
    isOpen:
    titleText:
    optionOneText:
    optionTwoText:
  }
  listeners : {
    [listenerId]: true
  },
}
