import config from "../../config";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(config.fb);
} else {
  app = firebase.app(); // if already initialized, use that one
}

const storage = app.firestore();

export { app };
export default storage;
