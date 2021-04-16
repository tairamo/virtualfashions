import React from "react";
import { object, string } from "prop-types";
import { Link } from "react-router-dom";

import RenderArtworks from "../RenderArtworks";
import Footer from "../Footer";
import Header from "../Header";

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

const Section = ({ account, asset }) => {
  const _username = account.user ? account.user.username : null;
  const _address = account.address;
  const displayName = _username
    ? _username
    : _address.substring(2, 6 + 2).toUpperCase();

  return (
    <SectionChild>
      <Link to="/profile">
        <AvatarUsername
          width={40}
          imageUrl={account.profile_img_url}
          username={displayName}
        />
      </Link>
      <div>
        <h2>{asset.name}</h2>
      </div>
      <BidInfo />
      <Button style={{ margin: "10px 0", borderRadius: "10px" }}>
        View artwork
      </Button>
    </SectionChild>
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
    // const { accountAddress, seaport } = this.props;
    const { accountAddress, seaport } = window;
    console.log("Sea port HOME:", seaport);
    const { orders, count } = await seaport.api.getOrders({}, this.state.page);

    this.setState({ order: orders[0] });
  }

  render() {
    if (this.state.order === undefined) {
      return <h1>Loading...</h1>;
    }
    const { asset, makerAccount } = this.state.order;

    return (
      <Container>
        <Header />
        <FirstSection>
          <div className="fd-1">
            <div className="fd-child-1">
              <a
                target="_blank"
                rel="noopnener noreferrer"
                href={asset.openseaLink}
              >
                <img alt="Asset artwork" src={asset.imageUrl} />
              </a>
            </div>
            <div className="fd-child-2">
              <Section asset={asset} account={makerAccount} />
            </div>
          </div>
        </FirstSection>
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
              <RenderArtworks />
            </AuctionsContent>
          </div>
        </LiveAuctionsSection>
        <Button style={{ margin: "auto auto 40px" }}>
          Become a creator on Virtual Fashion
        </Button>
        <Footer />
      </Container>
    );
  }
}

export default Home;
