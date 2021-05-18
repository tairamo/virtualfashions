// import { Link } from "react-router-dom";

import Avatar from "../../Avatar";
import { Container, Header, Content, HeaderUsername } from "./styles";

export const ProductCreator = (props) => (
  <Container>
    <Header>Creator</Header>
    <Content>
      <div>
        <Avatar width={100} />
        <HeaderUsername>
          <div>
            <div>
              <font style={{ verticalAlign: "middle" }}>{props.name}</font>
            </div>
            <div className="username-1">
              <div>{props.username}</div>
            </div>
          </div>
        </HeaderUsername>
      </div>
      <p>
        Taking a Global Overview. Change your way of thinking and after that you
        can expect to change the world
      </p>
    </Content>
  </Container>
);

export default ProductCreator;
