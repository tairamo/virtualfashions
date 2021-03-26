import Footer from "../Footer";
import Header from "./Header";
import Card from '../Card'

import {
  Container,
  FirstSection,
  LiveAuctionsSection,
  AuctionsHeader,
  AuctionsContent,
  AudContentFirst,
  LiveCir
} from "./styles";

export const Home = () => (
  <Container>
    <Header />
    <FirstSection>
      <div className="fd-1">
        <div className="fd-child-1">
          <p>IMAGE GO HERE</p>
        </div>
        <div className="fd-child-2">
          <p>INFO ABOUT TRANSACTION GOES HERE</p>
        </div>
      </div>
    </FirstSection>
    <LiveAuctionsSection>
      <div>
        <AuctionsHeader>
          <div>
            <LiveCir/>
            <h1>Live Auctions</h1>
          </div>
          <p>View all live Auctions</p>
        </AuctionsHeader>
        <AuctionsContent>
          <AudContentFirst>
            {[0,1,2,3,4,5,6,7,8,9].map(i => (
              <Card/>
            ))}
          </AudContentFirst>
        </AuctionsContent>
      </div>
    </LiveAuctionsSection>
    <Footer />
  </Container>
);

export default Home;
