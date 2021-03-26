import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex: auto;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 10px 20px rgb(0 0 0 / 5%);
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  text-decoration: none;
  color: inherit;
  will-change: transform;
`;

export const CardImage = styled.div`
  min-width: 0;
  position: relative;
  overflow: hidden;
  background: var(--gray);
`;

export const CardHeader = styled.div`
  min-width: 0;
  display: grid;
  grid-gap: 24px;
  box-shadow: 0px 10px 20px rgb(0 0 0 / 5%);
  padding: 24px;
  flex: 1;

  .card-title {
    margin: 0;
    min-width: 0;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 600;
  }
  .card-info {
    min-width: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-top: auto;
  }
`;
