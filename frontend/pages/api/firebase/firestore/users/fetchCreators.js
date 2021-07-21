// Fetches all users
import {firrStore} from '../../../../../utils/firebaseAdmin'

export default function fetchAll(req, res) {

    var data = []

    firrStore.collection("users").where("isCreator", "==", true).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            data.push(doc.data()["username"])
        })
        res.status(200).json(data)
    }).catch((error) => {
        res.status(500).json({error})
    })

}