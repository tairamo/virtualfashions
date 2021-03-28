import styled from "styled-components";

export const Container = styled.div``;

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
  grid-gap: 24px;
  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: 40em) {
    grid-gap: 32px;
  }
  @media screen and (min-width: 52em) {
    grid-template-columns: auto 300px;
  }
  @media screen and (min-width: 64em) {
    grid-template-columns: auto 400px;
  }
`;

export const SocialInfo = styled.div`
  position: relative;

  @media screen and (min-width: 52em) {
    margin-left: auto;
  }

  & > :first-child {
    @media screen and (min-width: 40em) {
      display: none;
    }
    display: flex;
    margin-bottom: 16px;
  }

  & > :last-child {
    @media screen and (min-width: 52em) {
      grid-gap: 20px;
    }
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    display: grid;
    grid-gap: 16px;
  }
`;

export const SocialShadow = styled.div`
  display: flex;
  margin-bottom: 32px;

  @media screen and (min-width: 52em) {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }

  & > :first-child {
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    will-change: transform, box-shadow;
  }
  & a {
    @media screen and (min-width: 52em) {
      font-size: 18px;
    }
    outline: none;
    text-decoration: none;
    color: #000000;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #000000;
    font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 24px;
    box-shadow: 0px 10px 20px rgb(0 0 0 / 5%);
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 11px;
    padding-bottom: 12px;
    border-radius: 999px;
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .username-in-shadow {
    font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 16px;
    font-weight: 600;
    margin-left: 7px;
    margin-right: 7px;
    position: relative;
    top: -1px;
  }
`;
