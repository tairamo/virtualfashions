// Fetches all users
import { firrStore } from "../../../../../utils/firebaseAdmin";

export default async function usernameTokenPaths(req, res) {
  var data = [];

  firrStore
    .collection("token")
    .where("status", "==", "Approved")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data()["userUsername"]) {
          data.push({
            params: {
              username: doc.data()["userUsername"],
              tokenId: doc.data()["tokenId"],
            },
          });
        }
      });
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}
