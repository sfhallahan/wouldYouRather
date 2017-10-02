import { ref } from 'config/constants'
import { removeIsExtendBeforeSave } from 'helpers/utils'


export function saveDecision(decision) {
  const { decisionId, decisionPromise } = saveToDecisions(decision)
  return decisionPromise.then(() => ({...decision, decisionId}))
}

function saveToDecisions (decision) {
  const decisionId = ref.child(`decisions`).push().key
  const decisionWithId = {...decision, decisionId}
  const decisionPromise = ref.child(`decisions/${decisionId}`).set(decisionWithId)

  return {
    decisionId,
    decisionPromise,
  }
}

export function updateDecision(decision) {
  return ref.child(`decisions/${decision.decisionId}`).set(decision)
}

export function listenToResults(cb, errorCB) {
  ref.child('decisions').on('value', (snapshot) => {
    const decisions = snapshot.val() || {}
    const sortedIds = Object.keys(decisions).sort((a, b) => decisions[b].timestamp - decisions[a].timestamp)
    cb({decisions, sortedIds})
  }, errorCB)
}

export function saveToUserDecisions(userId, decisionsMade) {
  return ref.child(`users/${userId}/decisionsMade`).set(decisionsMade)
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}
