import { Link } from "react-router-dom";

import Avatar from "../Avatar";
import RenderArtworks from "../RenderArtworks";
import Footer from "../Footer";
import Header from "./Header";

import {
  Container,
  FirstSection,
  LiveAuctionsSection,
  AuctionsHeader,
  AuctionsContent,
  LiveCir,
  SectionChild,
  ButtonSection,
  SectionInfo,
} from "./styles";
import { Button } from "../common";

const Section = () => (
  <SectionChild>
    <Link to="/profile">
      <ButtonSection>
        <Avatar width={40} /> <span>@dedaldino</span>
      </ButtonSection>
    </Link>
    <div>
      <h2>HEADQUARTERS</h2>
    </div>
    <SectionInfo>
      <div className="nft-info">
        <div>Sold for</div>
        <div>4.0 ETH</div>
        <div>$6,866.32</div>
      </div>
      <div>
        <div>Owned by</div>
        <ButtonSection>
          <Avatar width={40} /> <span>0x5190...2d6d</span>
        </ButtonSection>
      </div>
    </SectionInfo>
    <Button style={{ margin: "10px 0", borderRadius: "10px" }}>
      View artwork
    </Button>
  </SectionChild>
);

export const Home = () => (
  <Container>
    <Header />
    <FirstSection>
      <div className="fd-1">
        <div className="fd-child-1"></div>
        <div className="fd-child-2">
          <Section />
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

export default Home;
