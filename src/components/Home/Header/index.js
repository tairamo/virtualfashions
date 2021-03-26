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
        <NavigatorItem href="#" active>
          Home
        </NavigatorItem>
        <NavigatorItem href="#">Creators</NavigatorItem>
      </Navigator>
      <ButtonConnect>Connect Wallet</ButtonConnect>
    </div>
  </HeaderContainer>
);

export default Header;
