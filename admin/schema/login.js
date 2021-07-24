import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: yup.string().required("Please enter password"),
});
