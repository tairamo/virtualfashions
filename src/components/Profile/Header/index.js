import Avatar from "../../Avatar";
import RenderArtworks from "../../RenderArtworks";
import MainHeader from "../../Header";
import Footer from "../../Footer";
import { Button } from "../../common";
import ShortInfo from "../ShortInfo";
import {
  Container,
  HeaderUserInfo,
  IDContent,
  Creations,
  CreationsHeader,
  HeaderContent,
  HeaderUsername,
} from "./styles";

const Header = () => {
  return (
    <>
      <MainHeader style={{ position: "absolute", background: "transparent" }} />
      <div>
        <Container>
          <div>
            <div></div>
            <div></div>
          </div>
          <HeaderContent>
            <Avatar width={130} />
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
            <div>
              <div>
                <Button>Follow</Button>
              </div>
            </div>
          </HeaderContent>
          <HeaderUserInfo>
            <div>
              <IDContent>
                <div>
                  <font style={{ verticalAlign: "middle" }}>#</font>
                  <font style={{ verticalAlign: "middle" }}>04989</font>
                </div>
                <div>
                  <font style={{ verticalAlign: "middle" }}>
                    0x5E3B ... B22a
                  </font>
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
            <Creations>
              <CreationsHeader>
                <div>Creations</div>
              </CreationsHeader>
              <RenderArtworks />
            </Creations>
            <ShortInfo />
          </HeaderUserInfo>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Header;
