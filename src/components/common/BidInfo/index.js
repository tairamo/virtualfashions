import Avatar from "../../Avatar";
import { Container, BidEnded } from "./styles";
import RemainingTime from "./RemainingTime";

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
        <RemainingTime />
      )}
    </div>
  </Container>
);

export default BidInfo;
