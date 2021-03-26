import Header from "./Header";
import {
  Container,
  FirstSection,
  LiveAuctionsSection,
  AudictionsHeader,
  AudictionsContent,
  AudContentFirst
} from "./styles";

export const Home = () => (
  <Container>
    <Header />
    <FirstSection>
      <div className="fd-1">
        <div classnAME="fd-child-1"></div>
        <div classnAME="fd-child-2"></div>
      </div>
    </FirstSection>
    <LiveAuctionsSection>
      <div>
        <AudictionsHeader>
          <div>
            <h1>Live Audictions</h1>
            <p>View all live audictions</p>
          </div>
        </AudictionsHeader>
        <AudictionsContent>
          <AudContentFirst></AudContentFirst>
        </AudictionsContent>
      </div>
    </LiveAuctionsSection>
  </Container>
);

export default Home;
