import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCBpvKFaqUGDD17Eh_LtUKwphUspOTDwJw",
  authDomain: "hychatty.firebaseapp.com",
  databaseURL: "https://hychatty.firebaseio.com",
  projectId: "hychatty",
  storageBucket: "hychatty.appspot.com",
  messagingSenderId: "896083479783",
  appId: "1:896083479783:web:61d9c6258fae9da4bba642",
  measurementId: "G-5HKM0D1E0V",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
