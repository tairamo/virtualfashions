import firebase from 'firebase/app'
import 'firebase/firestore'

export default class Fuego {
  constructor(firebaseConfig) {
    this.db = !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig).firestore()
      : firebase.app().firestore();
    this.auth = firebase.auth;
    this.functions = firebase.functions;
    this.storage = firebase.storage;
  }
}
