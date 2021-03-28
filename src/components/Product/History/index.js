import { Link } from "react-router-dom";

import Avatar from "../../Avatar";
import { Container, BidHistory, Bid } from "./styles";

const ListBidHistory = () => (
  <BidHistory>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <Bid key={i}>
        <Avatar width={40} />
        <div>
          <div>
            Bid placed by <Link to="/profile">@dedaldino</Link>
          </div>
          <div>March 28, 2021 at 10:54am</div>
        </div>
        <div className="bid-money">
          <div>
            <div>16.50 ETH</div>
            <div>$27,950.67</div>
          </div>
          <div></div>
        </div>
      </Bid>
    ))}
  </BidHistory>
);
export const History = () => {
  return (
    <Container>
      <h2>History</h2>
      <ListBidHistory />
    </Container>
  );
};

export default History;
