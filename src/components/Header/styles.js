import styled, { css } from "styled-components";

export const HeaderContainer = styled.div`
  max-width: 100%;

  .d1 {
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    width: 100%;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 24px;
    position: relative;
    left: 0;
    transform: none;
    z-index: 999;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: 40em) {
      padding-top: 32px;
    }

    ${(props) =>
      props.absolute &&
      css`
        position: absolute;
        background: transparent;
      `}
  }
`;

export const Navigator = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  display: flex;
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
  height: 64px;
  box-shadow: 0px 10px 20px rgb(0 0 0 / 5%);
  border-radius: 10px;
  /* position: absolute; */
  /* top: 50%; */
  background-color: #ffffff;
  padding: 8px;
  align-items: center;

  @media screen and (min-width: 1400px) {
    display: flex;
    /* left: 50%; */
    /* transform: translate(-50%, -50%); */
  }
`;

export const NavigatorItem = styled.a`
  padding-left: 20px;
  padding-right: 20px;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: #000000;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 10px;
  background-color: var(--theme-ui-colors-white-100, #ffffff);
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  margin-left: 2px;
  margin-right: 2px;

  ${(props) =>
    props.active &&
    css`
      border-radius: 10px;
      background-color: #000000;
      color: var(--white-100);
    `}
`;
