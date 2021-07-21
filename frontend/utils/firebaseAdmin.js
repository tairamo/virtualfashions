import * as firebaseAdmin from "firebase-admin";
import config from "../config";

// Create firebase app function
function createFirebaseApp() {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(config.secret),
      databaseURL: config.fb.dbUrl,
    });
  }
}

// Call create firebase app
createFirebaseApp();

let firrStore = firebaseAdmin.firestore();

export { firrStore };

export const verifyIdToken = async (token) => {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(config.secret),
      databaseURL: config.fb.dbUrl,
    });
  }

  try {
    return await firebaseAdmin.auth().verifyIdToken(token);
  } catch (error) {
    throw error;
  }
};
