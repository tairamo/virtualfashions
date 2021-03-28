import { Logo } from "../common";
import WalletButton from "../WalletButton";
import { HeaderContainer, Navigator, NavigatorItem } from "./styles";

export const Header = (props) => (
  <HeaderContainer absolute={props.absolute}>
    <div className="d1">
      <Logo />
      <Navigator>
        <NavigatorItem href="#">Artworks</NavigatorItem>
        <NavigatorItem href="#" active>
          Home
        </NavigatorItem>
        <NavigatorItem href="#">Creators</NavigatorItem>
      </Navigator>
      <WalletButton />
    </div>
  </HeaderContainer>
);

export default Header;
