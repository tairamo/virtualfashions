import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().trim().required("Please enter title"),
  about: yup.string().required("Please enter description"),
  thumbnail: yup.object().shape({
    url: yup.string().required("Thumbnail/Preview is required"),
  }),
  file: yup.object().shape({
    url: yup.string().required("Art is required"),
  }),
  minBidPrice: yup.string().required("Please enter minimum bid price"),
  endingDate: yup
    .string()
    .nullable("Please select valid bid ending date")
    .required("Please select bid ending date"),
});
