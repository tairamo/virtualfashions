import { Link } from "react-router-dom";
import Avatar from "../Avatar";

import { CardContainer, CardImage, CardHeader, CardFooter } from "./styles";

export const Card = () => (
  <Link to="/product">
    <CardContainer>
      <CardImage></CardImage>
      <CardHeader>
        <div className="card-title">STAND ALONE</div>
        <div className="card-info">
          <Avatar width={30} /> <span>@tairamu</span>
        </div>
      </CardHeader>
      <CardFooter>
        <div style={{ marginRight: "24px" }}>
          <div className="foo-1">Current bid</div>
          <div className="foo-2">0.50 ETH</div>
        </div>
        <div>
          <div className="foo-1">Ending in</div>
          <div className="foo-2">Auction has ended</div>
        </div>
      </CardFooter>
    </CardContainer>
  </Link>
);

export default Card;
