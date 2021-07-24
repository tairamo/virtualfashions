import * as Web3 from "web3";

import { abi as tokenTokenAbi } from "../build/contracts/NiftyToken.json";
import { abi as auctionManagerAbi } from "../build/contracts/AuctionManager.json";

class Web3Instance {
  contractAddress = process.env.NEXT_PUBLIC_AUCTION_TOKEN_CONTRACT_ADDRESS;
  auctionMangerContractAddress =
    process.env.NEXT_PUBLIC_AUCTION_MANAGER_CONTRACT_ADDRESS;
  defaultGasPrice = process.env.NEXT_PUBLIC_DEFAULT_GAS_PRICE; // 30 gwei
  extendGasLimit = parseInt(process.env.NEXT_PUBLIC_EXTEND_GAS_LIMIT);

  constructor() {
    if (process.browser) {
      this.web3 = new Web3(window.ethereum);
    } else {
      this.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:7545")
      );
    }

    this.initializeContracts();
  }

  initializeContracts(options = {}) {
    // Token contract
    this.contract = new this.web3.eth.Contract(
      tokenTokenAbi,
      this.contractAddress,
      options
    );

    // Auction contract
    this.auctionContract = new this.web3.eth.Contract(
      auctionManagerAbi,
      this.auctionMangerContractAddress,
      options
    );
  }

  // Get balance
  async getBalance(account) {
    return await this.web3.eth.getBalance(account);
  }

  // Convert balance
  convertBalance(balance, type) {
    return this.web3.utils.fromWei(balance, type);
  }

  // Convert toWei
  convertToWei(balance, type) {
    return this.web3.utils.toWei(balance, type);
  }

  // Get commission
  async getCommission(account) {
    return await this.auctionContract.methods
      .getCommission()
      .call({ from: account });
  }

  async getContractBalance(account) {
    return await this.auctionContract.methods
      .getBalance()
      .call({ from: account });
  }

  async withdrawCommission(account) {
    const gas = await this.auctionContract.methods
      .withdrawCommission()
      .estimateGas({ from: account });

    return await this.auctionContract.methods.withdrawCommission().send({
      from: account,
      gas: gas + this.extendGasLimit,
      gasPrice: this.defaultGasPrice,
    });
  }
}

export default Web3Instance;
