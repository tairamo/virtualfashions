import styled from "styled-components";
import { ReactComponent as VFLogo } from "../../images/niftyicon.svg";

const Container = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const Logo = (props) => (
  <Container>
    <VFLogo />
  </Container>
);

export default Logo;
