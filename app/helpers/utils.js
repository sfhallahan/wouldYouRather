export function formatUserData (user) {
  return {
    uid: user.uid,
    name: user.displayName,
    avatar: user.photoURL,
  }
}
