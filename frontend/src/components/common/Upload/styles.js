import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  border-width: 1px;
  border-style: dashed;
  border-image: initial;
  border-color: #e6e6e6;
  border-radius: 10px;
  min-height: 115px;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  outline: none;
`;

export const Text = styled.div`
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  max-width: 180px;
  line-height: 1.4;
  text-align: center;
  margin: 0 auto;
`;
