import styled from "styled-components";

import Avatar from "../Avatar";

const Container = styled.div`
  min-width: 0;
  height: 60px;
  background: #ffffff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 8px;
  background: #ffffff;
  display: flex;
  box-shadow: 0px 10px 20px rgb(0 0 0 / 5%);
  align-items: center;
  border-radius: 9999px;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
  padding-right: 20px;

  @media (hover: hover) {
    &:hover {
      box-shadow: 0px 10px 20px rgb(0 0 0 / 10%);
      transform: translateY(-4px);
    }
  }

  @media screen and (min-width: 40em) {
    padding: 11px;
    padding-right: 20px;
  }

  > span {
    margin: 0px 0px 0px 8px;
    min-width: 0px;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-weight: 600;
    text-decoration: none;
    color: #000000;
    position: relative;
    top: -1px;
    font-size: 14px;

    margin-left: 10px;
    @media screen and (min-width: 40em) {
      font-size: 16px;
    }
  }
`;

export const AvatarUsername = (props) => (
  <Container>
    <Avatar width={props.width} /> <span>@{props.username}</span>
  </Container>
);

export default AvatarUsername;
