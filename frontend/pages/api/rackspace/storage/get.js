import axios from "axios";
import FormData from "form-data";
import configData from "../../../../config";

const data = new FormData();
const token = configData.cloud.token;

const config = {
  method: "get",
  url: configData.cloud.url,
  headers: {
    "X-Auth-Token": token,
    ...data.getHeaders(),
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
