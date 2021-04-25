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

  @media (hover: hover) {
    :hover {
      transform: translateY(-4px);
      box-shadow: 0px 10px 20px rgb(0 0 0 / 10%);
    }
  }
`;

export const CardImage = styled.div`
  min-width: 0;
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  background: var(--blue-bold);

  img{
    width: 100%;
    height: 100%;
  }
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
    color: #000;

    h3{
      text-overflow: ellipsis;
      line-height: 1.5;
    }
  }
  .card-info {
    min-width: 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-top: auto;
    color: #000;
    span {
      margin-left: 10px;
    }
  }
`;

export const CardFooter = styled.div`
  padding: 24px;
  width: 100%;
  background-color: #000000;
  display: flex;

  @media screen and (min-width: 52em) {
    padding: 14px;
  }

  .foo-1,
  .foo-2 {
    font-family: "Roobert", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 1;
  }
  
  .foo-1 {
    color: #7f7f7f;
    /* color: #CCCCCC; */
  }

  .foo-2 {
    color: #ffffff;
  }
`;
