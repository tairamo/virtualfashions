import * as yup from "yup";

import {
  TOKEN_REQUIRED,
  DESCRIPTION,
  THUMB_REQUIRED,
  TITLE,
} from "../constants";

export const schema = yup.object().shape({
  title: yup.string().trim().required(TITLE),
  about: yup.string().required(DESCRIPTION),
  thumbnail: yup.object().shape({
    url: yup.string().required(THUMB_REQUIRED),
  }),
  file: yup.object().shape({
    url: yup.string().required(TOKEN_REQUIRED),
  }),
});
