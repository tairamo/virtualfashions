import * as yup from "yup";

export const schema = yup.object().shape({
  bio: yup.string(),
  fullname: yup.string().trim(),
  username: yup.string().trim().required("Please enter username"),
});
