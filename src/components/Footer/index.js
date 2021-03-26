import styled from "styled-components";

const Container = styled.footer`
  padding-top: 48px;
  padding-bottom: 48px;
  background-color: #f2f2f2;

  & > div {
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
    <div>
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
