import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  dbUrl: process.env.NEXT_PUBLIC_FB_DB_URL,
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGIND_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

export let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(config);
} else {
  app = firebase.app(); // if already initialized, use that one
}

export const storage = app.firestore();
export const auth = app.auth();
