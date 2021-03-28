import styled from "styled-components";

export const ProductInfo = styled.div`
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: 52em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 64em) {
    grid-gap: 48px;
  }

  .product-info-1 {
    & > :first-child {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    & > :nth-child(2) {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.7;
      max-width: 27rem;

      & > p:not(:last-of-type) {
        margin-bottom: 16px;
      }
    }
  }

  .product-info-header {
    background-color: #ffffff;
    position: relative;
    z-index: 2;
    padding-bottom: 16px;

    @media screen and (min-width: 40em) {
      padding-bottom: 32px;
    }

    h2 {
      @media screen and (min-width: 64em) {
        margin-bottom: 0;
      }

      @media screen and (min-width: 52em) {
        font-size: 46px;
      }
      font-family: heading;
      font-weight: 600;
      line-height: heading;
      font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      font-size: 36px;
      line-height: 1.15;

      letter-spacing: -0.02em;
      font-weight: 600;
      margin-top: 24px;
      margin-bottom: 24px;
      word-wrap: break-word;
      hyphens: auto;
    }
  }

  .art-info {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.7;
    font-weight: bold;
    margin-left: 8px;
    cursor: pointer;
    color: #b3b3b3;
  }
`;

export const Container = styled.div`
  position: relative;
  margin-bottom: 32px;
  padding-bottom: 48px;

  @media screen and (min-width: 52em) {
    margin-bottom: 48px;
    padding-bottom: 68px;
  }

  & > :first-child {
    position: relative;

    & > :first-child {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
    }

    & > :last-child {
      height: 220px;
      /* background-image: ""; */
      background-color: #f2f2f2;
      background-size: cover;
      background-position: center;

      @media screen and (min-width: 52em) {
        height: 280px;
      }
    }
  }

  .bid-info-history {
    display: grid;
    grid-gap: 32px;
    position: relative;
    z-index: 5;
    flex: 1;
  }
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  position: relative;
  margin-bottom: 32px;
  padding-bottom: 48px;

  @media screen and (min-width: 52em) {
    margin-bottom: 48px;
    padding-bottom: 68px;
  }

  & > :nth-child(2),
  & > :first-child {
    display: flex;
    justify-content: flex-end;
    position: relative;
    z-index: 4;
    transform: translateY(-50%);
    margin-bottom: -40px;

    @media screen and (min-width: 52em) {
      margin-bottom: -56px;
    }
  }

  & > :first-child {
    display: flex;
    position: absolute;
    border: 10px solid #fff;
    top: 0;
    z-index: 3;
  }
`;

export const HeaderUserInfo = styled.div`
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  display: grid;
  gap: 32px;
  flex: 1;

  @media screen and (min-width: 40em) {
    gap: 48px;
  }

  @media screen and (min-width: 52em) {
    gap: 64px;
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
    font-size: 24px;
    letter-spacing: -0.035em;
    @media screen and (min-width: 40em) {
      font-size: 36px;
    }
    @media screen and (min-width: 52em) {
      font-size: 46px;
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
      margin-bottom: 8px;
      font-size: 36px;

      @media screen and (min-width: 40em) {
        margin-bottom: 16px;
        font-size: 46px;
      }

      @media screen and (min-width: 52em) {
        font-size: 66px;
      }

      @media screen and (min-width: 64em) {
        font-size: 76px;
      }
    }
  }
`;

export const IDContent = styled.div`
  display: flex;
  margin-bottom: 16px;
  margin-top: -16px;
  box-shadow: 0px 10px 20px rgb(0 0 0 / 5%);
  border-radius: 48px;
  align-items: center;
  min-height: 35px;
  max-width: max-content;
  padding-right: 10px;
  @media screen and (min-width: 52em) {
    margin-bottom: 24px;
  }

  & > :first-child {
    font-family: "Formular Mono", Consolas, "Andale Mono WT", "Andale Mono",
      "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono",
      "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco,
      "Courier New", Courier, monospace;
    font-size: 14px;
    font-weight: 400;
    font-size: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 9px;
    padding-bottom: 9px;
    background-color: #000000;
    color: #ffffff;
    letter-spacing: 1px;
    border-radius: 999px;
    text-transform: uppercase;
    @media screen and (min-width: 52em) {
      font-size: 14px;
    }
  }

  & > :nth-child(2) {
    font-family: "Formular Mono", Consolas, "Andale Mono WT", "Andale Mono",
      "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono",
      "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco,
      "Courier New", Courier, monospace;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.6px;
    padding-left: 12px;
  }
`;

export const Creations = styled.div`
  position: relative;
  z-index: 10;
`;

export const CreationsHeader = styled.div`
  margin: 0px 0px 32px;
  min-width: 0px;
  display: flex;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #e6e6e6;

  & > div {
    margin: 0px 48px -2px 0px;
    min-width: 0px;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 24px;
    font-weight: 600;
    border-bottom-style: solid;
    padding-bottom: 24px;
    border-width: 2px;
    border-color: #000000;
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
    cursor: pointer;
  }
`;
