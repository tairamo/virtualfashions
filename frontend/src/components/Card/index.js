import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../Avatar";
import Account from "./Account";

import { CardContainer, CardImage, CardHeader, CardFooter } from "./styles";
import RemainingTime from "../common/BidInfo/RemainingTime";
import SalePrice from "../common/SalePrice";

const AssetMetadata = (props) => {
  const { asset, makerAccount } = props;

  return (
    <>
      <CardImage>
        <img alt="Asset artwork" src={asset.imageUrl} />
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
  render() {
    const { order, accountAddress } = this.props;
    console.log("ORDER:", order);
    const { makerAccount, asset, assetBundle } = order;

    const owner = asset ? asset.owner : assetBundle.assets[0].owner;

    return (
      <Link to={`/products/${asset.tokenId}/${asset.assetContract.address}`}>
        <CardContainer>
          <AssetMetadata asset={asset} makerAccount={makerAccount} />
          <CardFooter>
            <div style={{ marginRight: "24px" }}>
              <div className="foo-1">Current bid</div>
              <div className="foo-2">
                <SalePrice order={order} />
              </div>
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
