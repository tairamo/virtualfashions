import styled from "styled-components";
import { Logo } from "../common";

const Container = styled.footer`
  padding: 48px 20px;
  background-color: #f2f2f2;
  max-width: 100%;

  .vf-info {
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-bottom: 40px;

    & > :first-child {
      margin-right: 15px;
    }

    h1 {
      font-size: 14px;
      color: #888;
      font-family: cursive, serif;
    }
  }

  .vf-social-law {
    width: 100%;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
`;

const Items = styled.div`
  display: flex;
  align-items: center;

  span {
    width: max-content;
    margin-right: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    color: var(--black-600);
    padding: 10px;

    :hover {
      color: #888;
    }
  }
`;

export const Footer = () => (
  <Container>
    <div className="vf-info">
      <Logo /> <h1>Virtual Fashion</h1>
    </div>
    <div className="vf-social-law">
      <Items>
        <span>Instagram</span>
        <span>Twitter</span>
        <span>Discord</span>
        <span>Blog</span>
      </Items>
      <Items>
        <span>Terms of Service</span>
        <span>Privacy</span>
        <span>Careers</span>
        <span>Help</span>
      </Items>
    </div>
  </Container>
);

export default Footer;
