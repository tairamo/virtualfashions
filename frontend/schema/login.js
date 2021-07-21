import * as yup from "yup";
import { EMAIL, PASSWORD, VALID_EMAIL } from "../constants";

export const schema = yup.object().shape({
  email: yup.string().email(VALID_EMAIL).required(EMAIL),
  password: yup.string().required(PASSWORD),
});
