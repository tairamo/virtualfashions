// Fetches all users
import {firrStore} from '../../../../../utils/firebaseAdmin'

export default function fetchCreatorNiftys(req, res) {

    var data = []

    var query = firrStore.collection("nifty").where("userId", "==", req.body.userId).where("status", "==", "Approved")
    
    query.get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            data.push(doc.data())
        })

        res.status(200).json(data)

    }).catch((error) => {
        res.status(500).json({error: error, hello: "world "})
    })
    
}