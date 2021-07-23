// import axios from "axios";
// import firebase from "firebase/app";
// import "firebase/firestore";
// import moment from "moment";

// // import firebaseAdim from '../../../utils/firebaseAdmin'

// export default function fetchETHPrice(req, res) {
//   var config = {
//     method: "get",
//     url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
//     headers: {
//       "X-CMC_PRO_API_KEY": "28f2db41-be26-4049-85c5-e2c66974d569",
//     },
//   };

//   axios(config)
//     .then(function (response) {
//       let ethPrice = Math.ceil(
//         response.data["data"][1]["quote"]["USD"]["price"]
//       );
//       let updatedAt = new Date().getTime();
//       res.status(200).json({ eth: ethPrice }).end();

//       // firebase.firestore().collection("price").doc("1027").set({
//       //     "ETH": ethPrice,
//       //     "updatedAt": updatedAt
//       // }).then(() => {
//       //     res.status(200).end()
//       // }).catch(() => {
//       //     res.status(501).json({firebaseError: error, ethhh: ethPrice}).end()
//       // })
//     })
//     .catch(function (error) {
//       console.log(error, "error");
//       res.status(500).json({ coinmarket: error, why: "namaste" }).end();
//     });
// }
