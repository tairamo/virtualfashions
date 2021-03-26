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
      @media screen and (min-width: 52em) {
        max-width: 640px;
        margin-left: auto;
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
  box-sizing: border-box;
  margin: 0;
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
  @media screen and (min-width: 40em) {
    padding-top: 64px;
  }
  @media screen and (min-width: 52em) {
    padding-top: 96px;
  }

  &,
  :first-child {
    display: flex;
    align-items: center;
  }

  :first-child {
    & h1 {
      font-weight: 600;
      font-size: 24px;
      margin-left: 15px;
    }

    p {
      font-size: 14px;
      font-weight: 600;
      color: #888;
      cursor: pointer;
    }
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
  margin: 0;
  min-width: 0;
  display: grid;
  grid-gap: 32px;
`;

export const AudContentFirst = styled.div`
  box-sizing: border-box;
  margin: 0;
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
