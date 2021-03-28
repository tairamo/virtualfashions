import styled from "styled-components";

export const Container = styled.div`
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Header = styled.div`
  font-size: 24px;
  font-weight: 600;
  border-bottom: solid 1px;
  border-color: #000000;
  padding-bottom: 24px;
  margin-bottom: 32px;
`;

export const Content = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(1, 1fr);
  align-items: flex-start;

  @media screen and (min-width: 52em) {
    gap: 48px;
  }

  @media screen and (min-width: 64em) {
    grid-template-columns: repeat(2, 1fr);
  }

  & > div:first-of-type {
    display: grid;
    align-items: center;
    grid-template-columns: 80px auto;
    gap: 16px;

    @media screen and (min-width: 40em) {
      grid-template-columns: 120px auto;
      gap: 32px;
    }

    & > :first-child {
      transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
      will-change: transform, box-shadow;
      max-width: max-content;
      box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;
      border-radius: 50%;
    }
  }

  div,
  p {
    font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    font-size: 16px;

    @media screen and (min-width: 40em) {
      font-size: 18px;
    }

    @media screen and (min-width: 52em) {
      font-size: 24px;
    }
  }
`;

export const HeaderUsername = styled.div`
  display: grid;
  grid-gap: 3px;
  justify-content: space-between;
  flex-direction: column;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media screen and (min-width: 52em) {
    flex-direction: row;
    display: flex;
    gap: 0;
    grid-template-columns: 2px;
    margin-right: 48px;
  }

  .username-1 {
    display: flex;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: -0.035em;

    @media screen and (min-width: 40em) {
      font-size: 26px;
    }
    @media screen and (min-width: 52em) {
      font-size: 36px;
    }

    & > :first-child {
      font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      background: linear-gradient(
        110.78deg,
        #76e650 -1.13%,
        #f9d649 15.22%,
        #f08e35 32.09%,
        #ec5157 48.96%,
        #ff18bd 67.94%,
        #1a4bff 85.34%,
        #62d8f9 99.57%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
    }
  }

  & > :first-child {
    & > :first-child {
      font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      font-weight: 600;
      letter-spacing: -0.05em;
      margin-bottom: 5px;
      font-size: 24px;

      @media screen and (min-width: 40em) {
        margin-bottom: 5px;
        font-size: 36px;
      }

      @media screen and (min-width: 52em) {
        font-size: 46px;
      }
    }
  }
`;
