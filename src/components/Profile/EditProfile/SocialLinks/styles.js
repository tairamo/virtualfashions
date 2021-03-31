import styled from "styled-components";

export const Container = styled.div``;

export const Title = styled.h2`
  margin: 0px 0px 32px;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 24px;
  font-weight: 600;
  max-width: 240px;
`;

export const MainContent = styled.div`
  display: grid;
  gap: 10px;
`;

export const Link = styled.div`
  display: grid;
  gap: 0px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: #e6e6e6;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  & > :first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;

    & > :first-child {
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      flex-flow: row nowrap;
    }

    & > :nth-child(2) {
      font-size: 14px;
      font-weight: 400;
      color: #7f7f7f;
    }
  }

  & svg {
    margin: 0px 8px 0px 0px;
  }
`;

export const Input = styled.div`
  margin: -1px;

  & input {
    display: block;
    width: 100%;
    padding: 2px 20px;
    appearance: none;
    font-size: inherit;
    color: inherit;
    line-height: 1;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    border: none;
    transition: box-shadow 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
    background-color: #ffffff;
    min-height: 60px;
    border-radius: 10px;
    box-shadow: rgb(230 230 230) 0px 0px 0px 1px inset,
      rgb(0 0 0 / 5%) 0px 10px 20px;
    outline: none;
  }
`;
