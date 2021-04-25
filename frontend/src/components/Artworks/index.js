import React from "react";

import RenderArtworks from "../RenderArtworks";
import Footer from "../Footer";
import Header from "../Header";

import {
  Container,
  LiveAuctionsSection,
  AuctionsHeader,
  AuctionsContent,
  LiveCir,
} from "../Home/styles";

const Artworks = () => {

    return (
      <Container>
        <Header />
        <LiveAuctionsSection>
          <div>
            <AuctionsHeader>
              <div>
                <LiveCir />
                <h1>Live auctions</h1>
              </div>
            </AuctionsHeader>
            <AuctionsContent>
              <RenderArtworks />
            </AuctionsContent>
          </div>
        </LiveAuctionsSection>
        <Footer />
      </Container>
    );
}

export default Artworks;
