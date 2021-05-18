import { useState } from "react";
import { connectWallet } from "../../WalletButton";
import { Button, BidInfo, Loading } from "../../common";
import { Container, ProductBidHeader } from "./styles";

const ProductBidInfo = (props) => {
  const [state, setState] = useState({ creatingOrder: false });
  const { accountAddress, seaport } = window;
  const { order } = props;

  const fulfillOrder = async () => {
    if (!accountAddress) {
      await connectWallet();
    }
    try {
      setState({ creatingOrder: true });
      const res = await seaport.fulfillOrder({ order, accountAddress });
      console.log("bid result:", res);
      alert(res);
    } catch (err) {
      alert(err);
      console.log("Something went wrong: ", err);
    } finally {
      setState({ creatingOrder: false });
    }
  };

  return (
    <Container>
      <ProductBidHeader>
        <BidInfo active={props.active} />
      </ProductBidHeader>
      <div className="place-bid-button">
        {state.creatingOrder ? (
          <div>
            <Loading /> Biding NFT...
          </div>
        ) : (
          <Button onClick={fulfillOrder}>Place a bid</Button>
        )}
      </div>
    </Container>
  );
};

export default ProductBidInfo;
