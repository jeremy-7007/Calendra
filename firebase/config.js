import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6mmf-E3xtOUHRTV9sG3QMaWHpKCXWO78",
  authDomain: "calendra-f68fb.firebaseapp.com",
  databaseURL:
    "https://calendra-f68fb-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "calendra-f68fb",
  storageBucket: "gs://calendra-f68fb.appspot.com",
  messagingSenderId: "2126026524",
  appId: "1:2126026524:android:bea5e7114f6811ea3e8cd9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
