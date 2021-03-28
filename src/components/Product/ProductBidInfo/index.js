import { Button, BidInfo } from "../../common";
import { Container, ProductBidHeader } from "./styles";

const ProductBidInfo = (props) => (
  <Container>
    <ProductBidHeader>
      <BidInfo active={props.active} />
    </ProductBidHeader>
    <div className="place-bid-button">
      <Button>Place a bid</Button>
    </div>
  </Container>
);

export default ProductBidInfo;
