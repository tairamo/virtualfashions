// // Fetches all users
// import {firrStore} from '../../../../../utils/firebaseAdmin'

// export default function fetchDetails(req, res) {

//     var data = {}

//     firrStore.collection("users").where("username", "==", req.body.username).get()
//     .then((snapshot) => {
//         data = snapshot.docs[0].data()
//         res.status(200).json(data)

//     }).catch((error) => {
//         res.status(500).json({error})
//     })

// }
