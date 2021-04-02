import styled from "styled-components";

export const Container = styled.div`
  h2 {
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 24px;
    font-weight: 600;
    margin: 0px 0px 24px;
  }
`;

export const BidHistory = styled.div`
  @media screen and (min-width: 52em) {
    gap: 16px;
  }

  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: grid;
  gap: 8px;
`;

export const Bid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 36px 4fr 2fr;
  padding: 16px 10px;
  border-radius: 10px;
  align-items: center;
  position: relative;
  background-color: #ffffff;

  @media screen and (min-width: 40em) {
    padding-left: 16px;
    padding-right: 16px;
    gap: 16px;
  }

  @media screen and (min-width: 52em) {
    padding-left: 24px;
    padding-right: 24px;
    grid-template-columns: 44px 4fr 2fr;
  }

  & > :first-child {
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
    will-change: transform;
  }

  ::before {
    content: "";
    position: absolute;
    inset: 0px;
    z-index: -1;
    box-shadow: rgb(0 0 0 / 5%) 0px 10px 20px;
    border-radius: 10px;
  }

  & > :nth-child(2) {
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-weight: 600;
    font-size: 14px;
    @media screen and (min-width: 52em) {
      font-size: 16px;
    }

    a {
      @media screen and (min-width: 52em) {
        font-size: 16px;
      }

      text-decoration: none;
      display: inline;
      font-size: 14px;
    }

    & > :last-child {
      box-sizing: border-box;
      margin: 0px;
      min-width: 0px;
      font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      font-weight: 400;
      white-space: pre;
      font-size: 14px;

      @media screen and (min-width: 52em) {
        font-size: 16px;
      }
    }
  }

  .bid-money {
    display: grid;
    gap: 16px;
    grid-template-columns: auto 16px;
    align-items: center;
    text-align: right;

    @media screen and (min-width: 40em) {
      gap: 24px;
    }

    & > :first-child {
      box-sizing: border-box;
      margin: 0px 0px 3px;
      min-width: 0px;
      font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      font-weight: 600;
      font-size: 14px;
      white-space: pre;

      @media screen and (min-width: 40em) {
        font-size: 24px;
      }

      @media screen and (min-width: 52em) {
        font-size: 20px;
      }
      & > :last-child {
        font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        font-size: 14px;
        font-weight: 600;
        color: #666666;
      }
    }
  }
`;
