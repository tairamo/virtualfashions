// import { Link } from "react-router-dom";

import Avatar from "../../Avatar";
import { Container, Header, Content, HeaderUsername } from "./styles";

export const ProductCreator = () => (
  <Container>
    <Header>Creator</Header>
    <Content>
      <div>
        <Avatar width={100} />
        <HeaderUsername>
          <div>
            <div>
              <font style={{ verticalAlign: "middle" }}>Bob Doyle</font>
            </div>
            <div className="username-1">
              <div>@bobdoyle</div>
            </div>
          </div>
        </HeaderUsername>
      </div>
      <p>
        A passionate Software Engineer with more than 5 years of experience in
        software development and analysis. Designer, Hotaku & Gamer. Curently
        based in Luanda, Angola but in few months...
      </p>
    </Content>
  </Container>
);

export default ProductCreator;
