import React from "react";
import { object, string } from "prop-types";
import { Link } from "react-router-dom";

import Loading, {ContainerLoading} from "../common/Loading"
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

const Section = ({ order }) => {
  const { makerAccount, asset } = order;
  const _username = makerAccount.user ? makerAccount.user.username : null;
  const _address = makerAccount.address;
  const displayName = _username
    ? _username
    : _address.substring(2, 6 + 2).toUpperCase();

  return (
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
      <BidInfo order={order}/>
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
    const { accountAddress, seaport } = window;
    const { orders, count } = await seaport.api.getOrders({}, this.state.page);

    this.setState({ order: orders[0] });
  }

  render() {

    return (
      <Container>
        <Header />
        {this.state.order === undefined ? <ContainerLoading><Loading/></ContainerLoading> : <FirstSection>
          <div className="fd-1">
            <div className="fd-child-1">
              <a
                target="_blank"
                rel="noopnener noreferrer"
                href={this.state.order.asset.openseaLink}
              >
                <img alt="Asset artwork" src={this.state.order.asset.imageUrl} />
              </a>
            </div>
            {!this.state.order.asset ? <Loading/> : <div className="fd-child-2">
              <Section order={this.state.order} />
            </div>}
          </div>
        </FirstSection>}
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
