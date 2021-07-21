import * as yup from "yup";
import moment from "moment";

import {
  VALID_AMOUNT,
  INVALID_DATE,
  INVALID_AMOUNT,
  ENTER_VALID_DATE,
  MIN_AMOUNT_REQUIRED,
  END_DATE_REQUIRED,
} from "../constants";

export const creactAuctionSchema = yup.object().shape({
  minimumBid: yup
    .string()
    .nullable(MIN_AMOUNT_REQUIRED)
    .required(MIN_AMOUNT_REQUIRED)
    .test("validAmount", VALID_AMOUNT, function (value) {
      let valid = false;
      const message = INVALID_AMOUNT;
      try {
        const amount = value * 1;
        if (isNaN(amount)) throw new Error(message);
        if (!(amount > 0)) throw new Error(message);
        valid = true;
      } catch (err) {
        // console.log(err);
      }
      return valid;
    }),
  biddingEndDate: yup
    .string()
    .nullable()
    .required(END_DATE_REQUIRED)
    .test("validDate", ENTER_VALID_DATE, function (value) {
      let valid = false;
      const message = INVALID_DATE;
      try {
        const now = moment();
        const date = moment.unix(value);
        if (!date.isValid()) throw new Error(message);
        if (!date.isAfter(now)) throw new Error(message);
        valid = true;
      } catch (err) {
        // console.log(err);
      }
      return valid;
    }),
});
