import React from "react";
import { object, string } from "prop-types";
import { Link, useHistory, withRouter } from "react-router-dom";

import Loading, { ContainerLoading } from "../common/Loading";
import RenderArtworks from "../RenderArtworks";
import Footer from "../Footer";
import Header from "../Header";
import ErrorBoundary from "../ErrorBoundaries";

import {
  Container,
  FirstSection,
  LiveAuctionsSection,
  AuctionsHeader,
  AuctionsContent,
  LiveCir,
  SectionChild,
} from "./styles";
import { Button, BidInfo, AvatarUsername } from "../common";

const Section = ({ order }) => {
  const { makerAccount, asset } = order;
  const _username = makerAccount.user ? makerAccount.user.username : null;
  const _address = makerAccount.address;
  const displayName = _username
    ? _username
    : _address.substring(2, 6 + 2).toUpperCase();

  const history = useHistory();

  const viewProduct = (e) => {
    e.stopPropagation();
    history.push(`/products/${asset.tokenId}/${asset.assetContract.address}`);
  };

  return (
    <ErrorBoundary>
      <SectionChild>
        <Link to="/profile">
          <AvatarUsername
            width={40}
            imageUrl={makerAccount.profile_img_url}
            username={displayName}
          />
        </Link>
        <div>
          <h2>{asset.name}</h2>
        </div>
        <BidInfo order={order} />
        <Button
          onClick={viewProduct}
          style={{ margin: "10px 0", borderRadius: "10px" }}
        >
          View artwork
        </Button>
      </SectionChild>
    </ErrorBoundary>
  );
};

class Home extends React.Component {
  static propTyps = {
    seaport: object.isRequired,
    accountAddress: string,
  };

  state = {
    order: undefined,
    accountAddress: "",
    page: 1,
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { accountAddress, seaport } = window;
    const { orders, count } = await seaport.api.getOrders({}, this.state.page);

    this.setState({ order: orders[0] });
  }

  render() {
    return (
      <Container>
        <Header />
        {this.state.order === undefined ? (
          <ContainerLoading>
            <Loading />
          </ContainerLoading>
        ) : (
          <ErrorBoundary>
            <FirstSection>
              <div className="fd-1">
                <div className="fd-child-1">
                  <img
                    alt="Asset artwork"
                    src={this.state.order.asset.imageUrl}
                  />
                </div>
                {!this.state.order.asset ? (
                  <Loading />
                ) : (
                  <div className="fd-child-2">
                    <Section order={this.state.order} />
                  </div>
                )}
              </div>
            </FirstSection>
          </ErrorBoundary>
        )}
        <LiveAuctionsSection>
          <div>
            <AuctionsHeader>
              <div>
                <LiveCir />
                <h1>Live auctions</h1>
              </div>
              <p>View all live auctions</p>
            </AuctionsHeader>
            <AuctionsContent>
              <ErrorBoundary>
                <RenderArtworks />
              </ErrorBoundary>
            </AuctionsContent>
          </div>
        </LiveAuctionsSection>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            this.props.history.push("/creators/create");
          }}
          style={{ margin: "auto auto 40px" }}
        >
          Become a creator on Virtual Fashion
        </Button>
        <Footer />
      </Container>
    );
  }
}

export default withRouter(Home);
