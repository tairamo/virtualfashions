import firebase from "firebase/app";
import "firebase/firestore";

export default async function fetchETHPrice(req, res) {
  firebase
    .firestore()
    .collection("price")
    .doc("1027")
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.status(200).json({ ETH: doc.data()["ETH"] });
      } else {
        res.status(500);
      }
    });
}
