import styled, { css } from "styled-components";

export const HomeContainer = styled.div`
  .d1 {
    @media screen and (min-width: 40em) {
      padding-top: 32px;
    }

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
  }
`;

export const Navigator = styled.div`
  @media screen and (min-width: 1400px) {
    display: flex;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  display: flex;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  height: 64px;
  box-shadow: 0px 10px 20px rgb(0 0 0 / 5%);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  background-color: #ffffff;
  padding: 8px;
  align-items: center;
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
    `}
`;

export const ButtonConnect = styled.button`
  @media screen and (min-width: 52em) {
    padding: 16px 24px;
  }
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  appearance: none;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  will-change: transform;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 600;
  padding: 16px 32px;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
  cursor: pointer;
  outline: none;
  background-color: #000000;
  color: #ffffff;
  border-width: 2px;
  border-style: solid;
  border-image: initial;
  border-color: #1a1a1a;
  font-size: 18px;
  display: flex;
  align-items: center;
  border-radius: 999px;
  min-height: 54px;
  max-height: 54px;
`;
