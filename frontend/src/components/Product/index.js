import React from "react";
import { FaShare } from "react-icons/fa";

import MainHeader from "../Header";
import Footer from "../Footer";
import { Button, AvatarUsername, Loading } from "../common";
import ProductBidInfo from "./ProductBidInfo";
import History from "./History";
import ProductCreator from "./ProductCreator";
import { Container, ProductInfo, HeaderContent } from "./styles";

class Product extends React.Component {
  state = {
    order: null,
    accountAddress: "",
    loading: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, state) {
    const { productId } = this.props.match.params;
    if (prevProps.match.params.productId !== productId) {
      this.fetchData();
    }
  }

  async fetchData() {
    const { accountAddress, seaport } = window;
    const { productId, tokenId } = this.props.match.params;

    try {
      const order = await seaport.api.getOrder({
        schemaName: "ERC1155",
        token_id: tokenId,
        asset_contract_address: productId,
      });
      this.setState({ order, loading: false });
    } catch (err) {
      console.log("error getting product:", err);
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    const { makerAccount: owner, asset } = this.state.order;

    const bgST = {
      backgroundImage: `url(${asset.imageUrl})`,
    };

    const MAX_ADDR_LEN = 6;

    const _username = owner.user ? owner.user.username : null;
    const _address = owner.address;
    const displayName = _username
      ? _username
      : _address.substring(2, MAX_ADDR_LEN + 2).toUpperCase();

    return (
      <>
        <MainHeader absolute white />
        <Container>
          <div>
            <div></div>
            <div style={{ ...bgST }}></div>
          </div>
          <HeaderContent>
            <AvatarUsername
              width={40}
              username={displayName}
              source={owner.profile_img_url}
            />
            <div>
              <Button
                style={{
                  boxShadow: "0px 10px 20px rgb(0 0 0 / 5%)",
                  color: "#000",
                  border: "none",
                  backgroundColor: "#fff",
                }}
              >
                <FaShare style={{ marginRight: "6px" }} />
                Share
              </Button>
            </div>
          </HeaderContent>
          <ProductInfo>
            <div>
              <div className="product-info-header">
                <div>
                  <h2>{asset.name}</h2>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <div className="art-info">Artwork information</div>
                </div>
              </div>
              <div className="product-info-1">
                <div>Description</div>
                <div>
                  <p>{asset.description}</p>
                </div>
              </div>
            </div>
            <div className="bid-info-history">
              <ProductBidInfo active order={this.state.order} />
              <History />
            </div>
          </ProductInfo>
          <ProductCreator />
        </Container>
        <Footer />
      </>
    );
  }
}

export default Product;
