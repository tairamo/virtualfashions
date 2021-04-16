import React from "react";
import { Link } from "react-router-dom";

import { connectWallet } from "../WalletButton";

import Avatar from "../Avatar";
import Account from "./Account";

import { CardContainer, CardImage, CardHeader, CardFooter } from "./styles";
import RemainingTime from "../common/BidInfo/RemainingTime";

const AssetMetadata = (props) => {
  const { asset, makerAccount } = props;

  return (
    <>
      <CardImage>
        <a target="_blank" rel="noopnener noreferrer" href={asset.openseaLink}>
          <img alt="Asset artwork" src={asset.imageUrl} />
        </a>
      </CardImage>
      <CardHeader>
        <div className="card-title">
          <h3>{asset.name}</h3>
        </div>
        <div className="card-info">
          <Account account={makerAccount} />
        </div>
      </CardHeader>
    </>
  );
};

export class Card extends React.Component {
  fullfillOrder = async () => {
    const { order, accountAddress } = this.props;
    if (!accountAddress) {
      await connectWallet();
    }
    try {
      this.setState({ creatingOrder: true });
      await this.props.seaport.fullfillOrder({ order, accountAddress });
    } catch (err) {
      console.log("Something went wrong: ", err);
    } finally {
      this.setState({ creatingOrder: false });
    }
  };

  renderBuyButton = (canAccept = true) => {
    const { creatingOrder } = this.state;
    const { accountAddres, order } = this.props;

    const buyAsset = async () => {
      if (accountAddres && !canAccept) {
        this.setState({
          errorMessage: "You already own this asset!",
        });
        return;
      }
      this.fullfillOrder();
    };
    // return (
    //   <button disabled={creatingOrder}
    //   onClick={buyAsset}
    //   >Buy</button>
    // )
  };

  render() {
    const { order, accountAddress } = this.props;
    console.log("ORDER:", order);
    const { makerAccount, asset, assetBundle } = order;

    const owner = asset ? asset.owner : assetBundle.assets[0].owner;

    return (
      <Link to="/product">
        <CardContainer>
          <AssetMetadata asset={asset} makerAccount={makerAccount} />
          <CardFooter>
            <div style={{ marginRight: "24px" }}>
              <div className="foo-1">Current bid</div>
              <div className="foo-2">4.0 ETH</div>
            </div>
            <div>
              <div className="foo-1">Ending in</div>
              <div className="foo-2">
                <RemainingTime short time={order.expirationTime} />
              </div>
            </div>
          </CardFooter>
        </CardContainer>
      </Link>
    );
  }
}

export default Card;
