import MainHeader from "../Header";
import Footer from "../Footer";
import { Button, AvatarUsername } from "../common";
import ProductBidInfo from "./ProductBidInfo";
import History from "./History";
import ProductCreator from "./ProductCreator";
import { Container, ProductInfo, HeaderContent } from "./styles";

const Product = () => {
  return (
    <>
      <MainHeader absolute />
      <Container>
        <div>
          <div></div>
          <div></div>
        </div>
        <HeaderContent>
          <AvatarUsername width={40} username="tairamu" />
          <div>
            <Button
              style={{
                boxShadow: "0px 10px 20px rgb(0 0 0 / 5%)",
                color: "#000",
                border: "none",
                backgroundColor: "#fff",
              }}
            >
              Share
            </Button>
          </div>
        </HeaderContent>
        <ProductInfo>
          <div>
            <div className="product-info-header">
              <div>
                <h2>PANIC ATTACK 3. RIVERS OF BLOOD</h2>
              </div>
              <div style={{ marginTop: "8px" }}>
                <div className="art-info">Artwork information</div>
              </div>
            </div>
            <div className="product-info-1">
              <div>Description</div>
              <div>
                <p>
                  The series includes 4 unique pieces of "PANIC ATTACK", the
                  most recent Pussy Riot's activist audio-visual artwork. The
                  VERY first Pussy Riot's NFT drop.
                </p>
                <p>
                  Pussy Riot's art was named by The Guardian among the best art
                  pieces of the 21st century, "Women of the year" (2012) by
                  TIME.
                </p>
                <p>
                  "RIVERS OF BLOOD" depicts a dystopian, nuclear winter world
                  where all fresh water turns to blood, it's a toxic wasteland
                  with acid rain and black snow.
                </p>
              </div>
            </div>
          </div>
          <div className="bid-info-history">
            <ProductBidInfo active />
            <History />
          </div>
        </ProductInfo>
        <ProductCreator />
        {/* <HeaderUserInfo>
          <div>
            <IDContent>
              <div>
                <font style={{ verticalAlign: "middle" }}>#</font>
                <font style={{ verticalAlign: "middle" }}>04989</font>
              </div>
              <div>
                <font style={{ verticalAlign: "middle" }}>0x5E3B ... B22a</font>
              </div>
              <div className="copy-add"></div>
            </IDContent>
            <HeaderUsername>
              <div>
                <div>
                  <font style={{ verticalAlign: "middle" }}>
                    Dedaldino M. Antonio
                  </font>
                </div>
                <div className="username-1">
                  <div>@dedaldino</div>
                </div>
              </div>
            </HeaderUsername>
          </div>
          <ProductCreator />
        </HeaderUserInfo> */}
      </Container>
      <Footer />
    </>
  );
};

export default Product;
