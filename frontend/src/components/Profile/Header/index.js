import { useEffect } from "react";
import { FaShare } from "react-icons/fa";

import Avatar from "../../Avatar";
import ListCreations from "../ListCreations";
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

const bgST = {
  backgroundImage:
    "url(https://f8n-production.imgix.net/creators/profile/fcusz42mh-obs-gif-4i7ctk.gif?q=90&w=1500)",
};

const Header = () => {
  useEffect(() => {
    document.title = "☆Chris☆ (@nyancat) | TokensBy";
  }, []);

  return (
    <>
      <MainHeader absolute white />
      <div>
        <Container>
          <div>
            <div></div>
            <div style={{ ...bgST }}></div>
          </div>
          <HeaderContent>
            <Avatar
              width={130}
              source="https://f8n-production.imgix.net/creators/profile/c8gley51s-nyan-cat-large-gif-gif-mbf1sa.gif?fit=fill&q=80&w=360"
            />
            <div>
              <Button
                style={{
                  boxShadow: "0px 10px 20px rgb(0 0 0 / 5%)",
                  color: "#000",
                  border: "none",
                  backgroundColor: "#fff",
                }}
              >
                <FaShare style={{ marginRight: "5px" }} />
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
                    <font style={{ verticalAlign: "middle" }}>☆Chris☆</font>
                  </div>
                  <div className="username-1">
                    <div>@nyancat</div>
                  </div>
                </div>
              </HeaderUsername>
            </div>
            <Creations>
              <CreationsHeader>
                <div>Creations</div>
              </CreationsHeader>
              <ListCreations />
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
