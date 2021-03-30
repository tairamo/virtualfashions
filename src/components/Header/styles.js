import { NavLink as Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const NavBars = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  display: none;
  z-index: 99;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#ccc" : "#333")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

export const NewWalletButton = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  margin-right: 24px;

  @media (max-width: 768px) {
    display: ${({ minor }) => (minor ? "none" : "flex")};
  }

  ${(props) =>
    props.minor &&
    css`
      @media (min-width: 769px) {
        display: flex;
      }
    `}
`;

export const Nav = styled.nav`
  background: transparent;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 10px;
  z-index: 12;

  @media screen and (min-width: 768px) {
    align-items: center;
  }

  ${(props) =>
    props.absolute &&
    css`
      background: transparent;
      position: absolute;
      width: 100%;
    `}
`;

export const NavLink = styled(Link)`
  padding-left: 20px;
  padding-right: 20px;
  text-decoration: none;
  color: #000000;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 10px;
  background-color: transparent;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  margin-left: 2px;
  margin-right: 2px;
  cursor: pointer;

  &.nav--active {
    border-radius: 10px;
    background-color: #000000;
    color: var(--white-100);
  }
`;

export const Bars = styled.div`
  display: none;
  color: #808080;
  height: 20px;
  width: 20px;
  background: #000;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  height: 64px;
  box-shadow: 0px 10px 20px rgb(0 0 0 / 5%);
  background: ${(props) => (props.absolute ? "transparent" : "#fff")};
  padding: 8px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    background-color: #000;
    width: 100vw;
    height: 100vh;
    z-index: 98;
    position: relative;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    & > div,
    & > a {
      width: 100%;
      text-align: center;
      background: transparent;
      color: #fff;
    }
  }
`;
