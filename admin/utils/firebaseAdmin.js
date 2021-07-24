import * as firebaseAdmin from "firebase-admin";

import config from "../config";
import serviceAccount from "./secret.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: config.fb.dbUrl,
  });
}

let firrStore = firebaseAdmin.firestore();

export { firrStore };
