import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCxVt0LJZcjDa5k3Rds837jSDDqdHPdCss",
  authDomain: "wouldyourather-88094.firebaseapp.com",
  databaseURL: "https://wouldyourather-88094.firebaseio.com",
  projectId: "wouldyourather-88094",
  storageBucket: "wouldyourather-88094.appspot.com",
  messagingSenderId: "131571308941"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth()
