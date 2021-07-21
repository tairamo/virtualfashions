import * as yup from "yup";
import {
  EMAIL,
  FULLNAME,
  MIN_6_WORDS,
  PASSWORD,
  VALID_EMAIL,
} from "../constants";

export const registerSchema = yup.object().shape({
  fullname: yup.string().required(FULLNAME),
  email: yup.string().email(VALID_EMAIL).required(EMAIL),
  password: yup.string().min(6, MIN_6_WORDS).required(PASSWORD),
});
