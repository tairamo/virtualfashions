import firebase from "firebase/app";
import "firebase/auth";

import config from "../config";

export default function firebaseClientInit() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.fb);
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }
}
