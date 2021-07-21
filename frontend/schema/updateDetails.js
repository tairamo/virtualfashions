import * as yup from "yup";

import { USERNAME } from "../constants";

export const schema = yup.object().shape({
  bio: yup.string(),
  fullname: yup.string().trim(),
  username: yup.string().trim().required(USERNAME),
});
