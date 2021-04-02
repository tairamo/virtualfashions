import styled from "styled-components";

export const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;

  & > :first-child {
    min-width: 0;
    margin-bottom: 24px;
    text-align: left;
    white-space: pre;

    @media screen and (min-width: 40em) {
      padding-right: 32px;
      border-right: solid 1px;
      border-color: #e6e6e6;
      margin-right: 32px;
      margin-bottom: 0;
    }

    & > :first-child {
      font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 5px;
    }

    & > :nth-child(2) {
      margin-bottom: 10px;
      font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      font-weight: 600;
      font-size: 24px;

      @media screen and (min-width: 72em) {
        font-size: 36px;
      }
    }
    & > :last-child {
      font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      font-size: 18px;
      font-weight: 600;
      color: #666666;
    }
  }

  & > :last-child {
    min-width: 0;
    text-align: left;
    max-width: 340px;
  }

  @media screen and (min-width: 40em) {
    flex-direction: row;
  }
`;

export const BidEnded = styled.div`
  min-width: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 8px;
  background: #ffffff;
  display: flex;
  box-shadow: 0px 10px 20px rgb(0 0 0 / 5%);
  align-items: center;
  border-radius: 9999px;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
  padding-right: 20px;

  @media (hover: hover) {
    &:hover {
      box-shadow: 0px 10px 20px rgb(0 0 0 / 10%);
      transform: translateY(-4px);
    }
  }

  @media screen and (min-width: 40em) {
    padding: 11px;
    padding-right: 20px;
  }

  > span {
    margin-left: 10px;
  }
`;

export const BidRemaining = styled.div`
  & > :first-child {
    font-size: 16px;
    font-weight: 600;
  }

  & > :last-child {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(3, 56px);
  }
  .bid-remaining-time {
    & > div :first-child {
      margin: 0px 0px 10px;
      font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      font-weight: 600;
      font-size: 24px;

      @media screen and (min-width: 72em) {
        font-size: 36px;
      }
    }

    & > div :last-child {
      font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      font-size: 16px;
      font-weight: 600;
      color: #666666;
    }
  }
`;
