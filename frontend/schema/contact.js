import * as yup from "yup";

import {
  EMAIL,
  FULLNAME,
  MESSAGE,
  VALID_EMAIL,
  phoneRegExp,
  VALID_PHONE,
  MIN_20_WORDS,
} from "../constants";

export const contactSchema = yup.object().shape({
  fullname: yup.string().required(FULLNAME),
  email: yup.string().email(VALID_EMAIL).required(EMAIL),
  phone: yup.string().test("validPhone", VALID_PHONE, function (value) {
    if (value && value.length > 0) {
      return phoneRegExp.test(value);
    }

    return true;
  }),
  message: yup.string().trim().min(20, MIN_20_WORDS).required(MESSAGE),
});
