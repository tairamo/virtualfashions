import styled from "styled-components";
import VFLogo from "../../images/vfs.png";

const Container = styled.div`
  width: 60px;
  height: 60px;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }
`;

export const Logo = (props) => (
  <Container>
    <img src={VFLogo} alt="virtual fashion" />
  </Container>
);

export default Logo;
