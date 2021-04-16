import * as Web3 from "web3";
import styled from "styled-components";

import { Button } from "../common";

const ButtonContainer = styled(Button)``;

let netCallbacks = [];
export const onNetworkUpdate = (callback) => {
  netCallbacks.push(callback);
};

const connectWallet = () => {
  let web3Provider =
    typeof web3 !== "undefined"
      ? window.web3.currentProvider
      : new Web3.providers.HttpProvider("https://mainet.infura.io");

  if (!window.web3) {
    console.log("Web3 not found in window");
    // web3Provider = new PortisProvider({
    //   // TODO: put Portis API key here
    // });
  } else if (window.ethereum) {
    window.ethereum.enable();
  } else {
    const errorMessage =
      "You need an Ethereum wallet to interact with this marketplace, Unlock your wallet, get MetaMask.io or Portis on desktop, or get Trust Wallet or Coinbase Wallet on mobile.";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  netCallbacks.map((c) => c(web3Provider));
};

const WalletButton = () => {
  return (
    <ButtonContainer onClick={connectWallet}>Connect Wallet</ButtonContainer>
  );
};

export default WalletButton;
