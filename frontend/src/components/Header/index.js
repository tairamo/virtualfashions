import { useState } from "react";
import { Nav, NavLink, NavBars, NavMenu, NewWalletButton } from "./styles";
import WalletButton from "../WalletButton";
import { Logo } from "../common";

const Header = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Nav absolute={props.absolute}>
        <Logo />
        <NavMenu open={open} absolute={props.absolute}>
          <NavLink to="/edit" activeClassName="nav--active">
            Artworks
          </NavLink>
          <NavLink exact to="/" activeClassName="nav--active">
            Home
          </NavLink>
          <NavLink to="#" activeClassName="nav--activ">
            Creators
          </NavLink>
          <NewWalletButton>
            <WalletButton />
          </NewWalletButton>
        </NavMenu>
        <NavBars open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
        </NavBars>
        <NewWalletButton minor>
          <WalletButton />
        </NewWalletButton>
      </Nav>
    </>
  );
};

export default Header;
