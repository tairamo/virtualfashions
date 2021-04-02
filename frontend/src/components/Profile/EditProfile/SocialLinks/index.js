import {
  FaGlobe,
  FaYoutube,
  FaSnapchat,
  FaTwitch,
  // FaTikTok,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";

import { Container, Title, MainContent, Link, Input } from "./styles";

const SocialLinks = () => {
  return (
    <Container>
      <Title>Add links to your social media profiles.</Title>
      <MainContent>
        <Link>
          <div>
            <div>
              <FaGlobe />
              <div>Website</div>
            </div>
            <div>https://</div>
          </div>
          <Input>
            <input
              type="website"
              title="Website"
              name="website"
              placeholder="Website URL"
            />
          </Input>
        </Link>
        <Link>
          <div>
            <div>
              <FaInstagram />
              <div>Instagram</div>
            </div>
            <div>instagram.com</div>
          </div>
          <Input>
            <input
              type="text"
              title="Instagram"
              name="instagram"
              placeholder="Instagram Username"
            />
          </Input>
        </Link>
        <Link>
          <div>
            <div>
              <FaTwitter />
              <div>Twitter</div>
            </div>
            <div>twitter.com</div>
          </div>
          <Input>
            <input
              type="text"
              title="Twitter"
              name="twitter"
              placeholder="Twitter Username"
            />
          </Input>
        </Link>
        <Link>
          <div>
            <div>
              <FaDiscord />
              <div>Discord</div>
            </div>
          </div>
          <Input>
            <input
              type="text"
              title="Discord"
              name="discord"
              placeholder="Include #Code"
            />
          </Input>
        </Link>
        <Link>
          <div>
            <div>
              <FaYoutube />
              <div>Youtube</div>
            </div>
          </div>
          <Input>
            <input
              type="text"
              title="Youtube"
              name="youtube"
              placeholder="Channel URL"
            />
          </Input>
        </Link>
        <Link>
          <div>
            <div>
              <FaFacebook />
              <div>Facebook</div>
            </div>
            <div>facebook.com</div>
          </div>
          <Input>
            <input
              type="text"
              title="Facebook"
              name="facebook"
              placeholder="Facebook Username"
            />
          </Input>
        </Link>
        <Link>
          <div>
            <div>
              <FaTwitch />
              <div>Twitch</div>
            </div>
            <div>twitch.tv</div>
          </div>
          <Input>
            <input
              type="text"
              title="Twitch"
              name="twitch"
              placeholder="Twitch Username"
            />
          </Input>
        </Link>
        <Link>
          <div>
            <div>
              {/* <FaTikTok /> */}
              <div>TikTok</div>
            </div>
            <div>tiktok.com</div>
          </div>
          <Input>
            <input
              type="text"
              title="TikTok"
              name="tiktok"
              placeholder="TikTok Username"
            />
          </Input>
        </Link>
        <Link>
          <div>
            <div>
              <FaSnapchat />
              <div>Snapchat</div>
            </div>
          </div>
          <Input>
            <input
              type="text"
              title="Snapchat"
              name="snapchat"
              placeholder="Snapchat Username"
            />
          </Input>
        </Link>
      </MainContent>
    </Container>
  );
};

export default SocialLinks;
