import Avatar from "../Avatar";
import Footer from "../Footer";
import Header from "./Header";
import Card from "../Card";

import {
  Container,
  FirstSection,
  LiveAuctionsSection,
  AuctionsHeader,
  AuctionsContent,
  AudContentFirst,
  LiveCir,
  SectionChild,
  ButtonSection,
  SectionInfo,
} from "./styles";
import { ButtonConnect } from "./Header/styles";

const Section = () => (
  <SectionChild>
    <ButtonSection>
      <Avatar width={40} /> <span>@dedaldino</span>
    </ButtonSection>
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
    <ButtonConnect style={{ margin: "10px 0", borderRadius: "10px" }}>
      View artwork
    </ButtonConnect>
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
          <AudContentFirst>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <Card key={i} />
            ))}
          </AudContentFirst>
        </AuctionsContent>
      </div>
    </LiveAuctionsSection>
    <ButtonConnect style={{ margin: "auto auto 40px" }}>
      Become a creator on Virtual Fashion
    </ButtonConnect>
    <Footer />
  </Container>
);

export default Home;
