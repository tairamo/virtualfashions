import firebase from "firebase/app";
import "firebase/auth";
import config from "../config";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: config.fb.apiKey,
  authDomain: config.fb.authDomain,
  projectId: config.fb.projectId,
  storageBucket: config.fb.storageBucket,
  messagingSenderId: config.fb.messagingSenderId,
  appId: config.fb.appId,
};

export default function firebaseClientInit() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }
}
