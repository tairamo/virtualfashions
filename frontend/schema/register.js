import * as yup from "yup";
import {
  EMAIL,
  FULLNAME,
  PASSWORD,
  MIN_6_WORDS,
  VALID_EMAIL,
  VALID_TOKEN,
} from "../constants";

export const registerSchema = yup.object().shape({
  fullname: yup.string().required(FULLNAME),
  token: yup.string().required(VALID_TOKEN),
  email: yup.string().email(VALID_EMAIL).required(EMAIL),
  password: yup.string().min(6, MIN_6_WORDS).required(PASSWORD),
});
