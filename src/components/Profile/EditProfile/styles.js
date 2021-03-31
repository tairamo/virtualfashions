import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Title = styled.h2`
  box-sizing: border-box;
  margin: 0px auto;
  min-width: 0px;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 46px;
  line-height: 1;
  letter-spacing: -0.02em;
  font-weight: 600;
  max-width: 740px;
  text-align: center;
  padding-top: 24px;

  @media screen and (min-width: 40em) {
    padding-top: 32px;
  }
  @media screen and (min-width: 52em) {
    padding-top: 64px;
    font-size: 56px;
  }
  @media screen and (min-width: 64em) {
    padding-top: 96px;
  }
`;

export const MainContent = styled.div`
  display: grid;
  gap: 24px;
  padding: 24px;

  @media screen and (min-width: 40em) {
    padding-top: 32px;
    padding-bottom: 32px;
  }
  @media screen and (min-width: 52em) {
    padding: 64px 48px;
  }

  @media screen and (min-width: 64em) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
  @media screen and (min-width: 72em) {
    padding-bottom: 128px;
  }

  & > :first-child {
    display: block;
    padding: 24px;
    box-shadow: rgb(0 0 0 / 5%) 0px 10px 20px;
    background-color: #ffffff;
    max-width: 740px;
    border-radius: 15px;
    text-decoration: none;
    color: #000000;

    @media screen and (min-width: 40em) {
      padding-left: 32px;
      padding-right: 32px;
    }

    @media screen and (min-width: 52em) {
      padding: 32px 48px;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    }
    @media screen and (min-width: 64em) {
      padding-top: 48px;
      padding-bottom: 48px;
    }
  }
`;

export const Form = styled.form`
  & > :first-child {
    display: grid;
    gap: 32px;

    @media screen and (min-width: 72em) {
      gap: 64px;
    }
  }

  & > :last-child {
    padding-top: 32px;
  }
`;

export const FormItem = styled.div`
  & > :last-child {
    display: grid;
    gap: 64px;
    grid-template-columns: 250px auto;
  }

  .form-item--header {
    margin: 0px 0px 24px;
    min-width: 0px;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 24px;
    font-weight: 600;
  }

  .form-item--header-dt {
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 16px;
    font-weight: 400;
    line-height: 1.7;
  }

  .form-item--content {
    margin: 0px 0px 10px;
    min-width: 0px;
    display: grid;
    gap: 10px;
  }
`;

export const Input = styled.div`
  position: relative;

  & > :first-child {
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-weight: 400;
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 10px;
    pointer-events: none;
    opacity: 0;
    transform: translateY(1px);
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
  }

  & input {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
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

export const InputPrepend = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: #e6e6e6;

  & > :first-child {
    font-size: 18px;
    font-weight: 400;
    padding-left: 20px;
    padding-right: 20px;
    color: #7f7f7f;
  }

  & > :last-child {
    display: flex;
    position: relative;
    flex: 1 1 auto;
    margin: -1px;
  }
`;

export const Textarea = styled.textarea`
  height: 288px;
  overflow-y: hidden;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: block;
  width: 100%;
  appearance: none;
  font-size: inherit;
  color: inherit;
  line-height: 1.5;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  border: none;
  transition: box-shadow 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
  background-color: #ffffff;
  padding: 24px 20px;
  border-radius: 10px;
  box-shadow: rgb(230 230 230) 0px 0px 0px 1px inset,
    rgb(0 0 0 / 5%) 0px 10px 20px;
  outline: none;
  resize: none;
  min-height: 60px !important;
`;
