import { Container, Header, Content, SocialInfo, SocialShadow } from "./styles";

export const ShortInfo = () => (
  <Container>
    <Header>About</Header>
    <Content>
      <p>
        A passionate Software Engineer with more then 5 years of experience in
        software development and analysis. Designer, Hotaku & Gamer. Curently
        based in Luanda, Angola but In few months...
      </p>
      <SocialInfo>
        <div></div>
        <SocialShadow>
          <div>
            <a href="#">
              <div className="username-in-shadow"></div>
            </a>
          </div>
        </SocialShadow>
        <div>
          <div>dedaldino3d.herokuapp.com</div>
          <div>dedaldino3D</div>
        </div>
      </SocialInfo>
    </Content>
  </Container>
);

export default ShortInfo;
