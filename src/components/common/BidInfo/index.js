import Avatar from "../../Avatar";
import { Container, BidEnded, BidRemaining as BidReContainer } from "./styles";

const BidRemaining = (props) => (
  <BidReContainer>
    <div>Action ending in</div>
    <div className="bid-remaining-time">
      <div>
        <div>{new Date().getHours()}</div>
        <div>Hours</div>
      </div>
      <div>
        <div>{new Date().getMinutes()}</div>
        <div>Minutes</div>
      </div>
      <div>
        <div>{new Date().getSeconds()}</div>
        <div>Seconds</div>
      </div>
    </div>
  </BidReContainer>
);

export const BidInfo = (props) => (
  <Container>
    <div className="nft-info">
      <div>Sold for</div>
      <div>4.0 ETH</div>
      <div>$6,866.32</div>
    </div>
    <div>
      {!props.active ? (
        <>
          <div>Owned by</div>
          <BidEnded>
            <Avatar width={40} /> <span>0x5190...2d6d</span>
          </BidEnded>
        </>
      ) : (
        <BidRemaining />
      )}
    </div>
  </Container>
);

export default BidInfo;
