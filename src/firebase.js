import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDh6duY4Reaq_oiDLx8xOIwLpcWi99DJ20",
    authDomain: "walmart-code-test.firebaseapp.com",
    databaseURL: "https://walmart-code-test.firebaseio.com",
    projectId: "walmart-code-test",
    storageBucket: "walmart-code-test.appspot.com",
    messagingSenderId: "569574386591"
  };
firebase.initializeApp(config);

export default firebase;