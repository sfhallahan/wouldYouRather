import { firebaseAuth, ref } from 'config/constants'
import firebase from 'firebase'

export function auth() {
  return firebaseAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
}

export function logout() {
  return firebaseAuth.signOut()
}

export function saveUser(user) {
  return ref.child(`users/${user.info.uid}/info`)
    .set(user.info)
    .then(() => user)
  }
