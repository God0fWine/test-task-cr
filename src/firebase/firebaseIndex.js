import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'
import firestore from 'firebase/firestore'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_BASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth()
firebase.firestore();
var storageRef = firebase.storage().ref();
var imagesRef = storageRef.child('images');
var fileName = 'hi.jpg';
var spaceRef = imagesRef.child(fileName);
var path = spaceRef.fullPath
var name = spaceRef.name
var imagesRef = spaceRef.parent;

export default {
  firebaseConfig
}
