import Avatar from "../../Avatar";
import SalePrice from "../SalePrice";
import { Container, BidEnded } from "./styles";
import RemainingTime from "./RemainingTime";

export const BidInfo = ({ order, account }) => (
  <Container>
    <div className="nft-info">
      {/*order.expirationTime ? 
      <>
        <div>Current bid</div>
        <div><SalePrice order={order}/></div>
        <div>$6,866.32</div>
      </>*/}
      <>
        <div>Sold for</div>
        {/*<div><SalePrice order={order}/></div>*/}
        <div>12.4534 ETH</div>
        <div>$6,866.32</div>
      </>
    </div>
    <div>
      <>
        <div>Owned by</div>
        <BidEnded>
          <Avatar width={40} /> <span>0x5190...2d6d</span>
        </BidEnded>
      </>
    </div>
  </Container>
);

export default BidInfo;
