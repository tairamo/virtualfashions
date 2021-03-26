import styled from "styled-components";

export const Container = styled.div``;

export const FirstSection = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;

  .fd-1 {
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    display: grid;
    grid-gap: 3px;
    gap: 0;
    min-height: calc(80vh - 86px);

    @media screen and (min-width: 52em) {
      padding-top: 64px;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
      align-items: center;
    }

    @media screen and (min-width: 64em) {
      padding-top: 96px;
      gap: 48px;
    }

    @media screen and (min-width: 72em) {
      gap: 96px;
    }

    .fd-child-1 {
      background: var(--gray);

      @media screen and (min-width: 52em) {
        max-width: 640px;
        margin-left: auto;
        width: 80%;
        height: 80%;
      }
    }

    .fd-child-2 {
      @media screen and (min-width: 64em) {
        padding-bottom: 24px;
      }
    }
  }
`;

export const LiveAuctionsSection = styled.div`
  min-width: 0;
  display: grid;
  grid-gap: 3px;
  padding-bottom: 32px;
  gap: 16px;

  & > div {
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    width: 100%;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
    position: relative;
    z-index: 4;
  }

  @media screen and (min-width: 40em) {
    padding-bottom: 48px;
  }
  @media screen and (min-width: 64em) {
    padding-bottom: 96px;
  }
`;

export const AuctionsHeader = styled.div`
  justify-content: space-between;
  border-bottom: 1px solid #888;
  margin-bottom: 20px;

  @media screen and (min-width: 40em) {
    padding-top: 64px;
  }
  @media screen and (min-width: 52em) {
    padding-top: 96px;
  }

  &,
  & > :first-child {
    display: flex;
    align-items: center;
  }

  & > :first-child {
    & h1 {
      font-weight: 600;
      font-size: 24px;
      margin-left: 15px;
    }
  }
  p {
    font-size: 14px;
    font-weight: 600;
    color: #888;
    cursor: pointer;
  }
`;

export const LiveCir = styled.div`
  width: 10px;
  height: 10px;
  background-color: #888;
  border-radius: 999px;
  opacity: 1;
  /* opacity: ${() => Math.random()};
    transform: ${() => `scale(${Math.random()})`} translateZ(0px); */
  position: relative;
  top: 2px;
`;

export const AuctionsContent = styled.div`
  min-width: 0;
  display: grid;
  grid-gap: 32px;
`;

export const AudContentFirst = styled.div`
  min-width: 0;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: 40em) {
    grid-gap: 24px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 52em) {
    grid-gap: 32px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 72em) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const SectionChild = styled.div`
  & > :nth-child(2) {
    @media screen and (min-width: 64em) {
      grid-gap: 32px;
    }
    min-width: 0;
    display: grid;
    grid-gap: 24px;

    h2 {
      padding-top: 16px;
      padding-bottom: 8px;
      min-width: 0;
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
      font-size: 46px;

      @media screen and (min-width: 42em) {
        font-size: 46px;
      }
      @media screen and (min-width: 52em) {
        font-size: 56px;
      }
      @media screen and (min-width: 64em) {
        font-size: 66px;
      }
    }
  }
`;

export const ButtonSection = styled.div`
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

export const SectionInfo = styled.div`
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
