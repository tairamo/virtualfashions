import {
  HeaderContainer,
  Navigator,
  NavigatorItem,
  ButtonConnect,
} from "./styles";

export const Header = () => (
  <HeaderContainer>
    <div className="d1">
      <Navigator>
        <NavigatorItem href="#">Artworks</NavigatorItem>
        <NavigatorItem href="#">Home</NavigatorItem>
        <ButtonConnect>Connect Wallet</ButtonConnect>
      </Navigator>
    </div>
  </HeaderContainer>
);

export default Header;
