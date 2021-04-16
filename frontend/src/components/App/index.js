import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { OpenSeaPort, Network } from "opensea-js";

import GlobalStyle from "../styles";
import Home from "../Home";
import Profile from "../Profile";
import EditProfile from "../Profile/EditProfile";
import Product from "../Product";
import { onNetworkUpdate, web3Provider } from "../WalletButton";

export class App extends React.Component {
  state = {
    accountAddress: null,
  };

  constructor(props) {
    super(props);
    this.onChangeAddress();
    onNetworkUpdate(this.onChangeAddress);
  }
  onChangeAddress = () => {
    this.seaport = new OpenSeaPort(web3Provider, {
      networkName: Network.Main,
    });
    console.log("Sea port:", this.seaport);
    window.seaport = this.seaport;
    this.web3 = this.seaport.web3;
    this.web3.eth.getAccounts((err, res) => {
      window.accountAddress = res[0];
      this.setState({
        accountAddress: res[0],
      });
    });
  };
  render() {
    return (
      <main>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/edit" exact component={EditProfile} />
            <Route path="/product" exact component={Product} />
          </Switch>
        </Router>
      </main>
    );
  }
}

export default App;
