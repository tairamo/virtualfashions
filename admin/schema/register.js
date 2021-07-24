import * as yup from "yup";

export const schema = yup.object().shape({
  fullname: yup.string().required("Please enter full name"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: yup
    .string()
    .min(6, "Please enter minimum 6 characters")
    .required("Please enter password"),
});
