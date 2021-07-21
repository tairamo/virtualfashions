import * as yup from "yup";

import { MIN_6_WORDS, PASSWORD, PASSWORD_MUST_MATCH } from "../constants";

export const resetPasswordShema = yup.object().shape({
  newPassword: yup.string().min(6, MIN_6_WORDS).required(PASSWORD),
  confirmPassword: yup
    .string()
    .min(6, MIN_6_WORDS)
    .oneOf([yup.ref("newPassword"), null], PASSWORD_MUST_MATCH),
});
