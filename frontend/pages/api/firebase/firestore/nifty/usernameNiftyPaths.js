// Fetches all users
import {firrStore} from "../../../../../utils/firebaseAdmin"

export default async function usernameNiftyPaths(req, res) {

    var data = []

    firrStore.collection("nifty").where("status", "==", "Approved").get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {

                if (doc.data()["userUsername"]) {
                    data.push({
                        params: {
                            username: doc.data()["userUsername"],
                            niftyId: doc.data()["niftyId"],
                        }
                    })
                }
            })
            res.status(200).json(data)
        }).catch((error) => {
            res.status(500).json({ error })
        })

}