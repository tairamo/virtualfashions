import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: grid;
  gap: 32px;
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 20px;
  border-radius: 10px;

  .place-bid-button {
    padding: 32px;
    border-top-width: 1px;
    border-top-style: solid;
    border-color: #e6e6e6;

    button {
      width: 100%;
      border-radius: 10px;
      padding: 24px 40%;
    }
  }
`;

export const ProductBidHeader = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: grid;
  gap: 48px;
  grid-template-columns: auto 1fr;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 32px;
`;
