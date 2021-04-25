import styled from "styled-components";

export const Container = styled.div`
  min-width: 0;
  max-width: 100%;
  display: grid;
  grid-gap: 14px;
  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: 40em) {
    grid-gap: 16px;
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
