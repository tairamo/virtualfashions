import * as yup from "yup";

import { EMAIL, VALID_EMAIL } from "../constants";

export const verifyEmailSchema = yup.object().shape({
  email: yup.string().email(VALID_EMAIL).required(EMAIL),
});
