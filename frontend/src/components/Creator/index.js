import { Link } from "react-router-dom";

import { Button } from "../common";
import Avatar from "../Avatar";
import {
  Container,
  HeaderPicture,
  AvatarLoc,
  UserInfo,
  Content,
} from "./styles";

const Creator = (props) => {
  return (
    <Container>
      <Link to="/profile">
        <HeaderPicture>
          <div>
            <div></div>
            <div>
              <img
                src="https://f8n-production.imgix.net/creators/profile/fcusz42mh-obs-gif-4i7ctk.gif?q=90&w=1500"
                alt="deda"
              />
            </div>
          </div>
          <AvatarLoc>
            <Avatar
              width={66}
              source="https://f8n-production.imgix.net/creators/profile/c8gley51s-nyan-cat-large-gif-gif-mbf1sa.gif?fit=fill&q=80&w=360"
            />
          </AvatarLoc>
        </HeaderPicture>
        <UserInfo>
          <div>☆Chris☆</div>
          <div>@nyancat</div>
        </UserInfo>
        <Content>
          <p>Artist. Creator of memes. Cat lover.</p>
          <div>
            <div className="creator__flw">
              <span>3874</span>
              <span>Followers</span>
            </div>
            <Button
              blackBorder
              style={{
                background: "transparent",
                color: "#000",
                padding: "5px 10px",
                borderRadius: "8px",
              }}
            >
              Follow
            </Button>
          </div>
        </Content>
      </Link>
    </Container>
  );
};

export default Creator;
