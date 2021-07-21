import axios from "axios";
import FormData from "form-data";
import configData from "../../../../config";

const token = configData.cloud.token;

export default function put(req, res) {
  var data = new FormData();
  // data.append('image', fs.createReadStream('/Users/alexandar/Documents/snow.jpg'));
  data.append("hello", "World");

  var config = {
    method: "put",
    url: configData.cloud.url,
    headers: {
      "X-Auth-Token": token,
      ...data.getHeaders(),
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
