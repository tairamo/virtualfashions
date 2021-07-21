import axios from "axios";
import configData from "../../../../config";

export default function getToken(req, res) {
  var data = JSON.stringify({
    auth: {
      "RAX-KSKEY:apiKeyCredentials": {
        username: configData.rackspace.username,
        apiKey: configData.rackspace.apikey,
      },
    },
  });

  var config = {
    method: "post",
    url: configData.rackspace.tokenUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.status(200).json(response.data["access"]["token"]["id"]);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
}
