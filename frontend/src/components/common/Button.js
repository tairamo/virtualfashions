import styled from 'styled-components'


export const Button = styled.button`
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

  @media screen and (min-width: 52em) {
    padding: 16px 24px;
  }
`;

export default Button;