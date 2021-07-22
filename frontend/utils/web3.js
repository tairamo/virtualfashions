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

  // Mint token
  async mintToken(account, tokenURI) {
    const gas = await this.contract.methods
      .mint(tokenURI)
      .estimateGas({ from: account });

    // Call mint method of token contract
    return await this.contract.methods.mint(tokenURI).send({
      from: account,
      gas: gas + this.extendGasLimit,
      gasPrice: this.defaultGasPrice,
    });
  }

  // List item
  async listToken(tokenId, biddingEndTimeStamp, account) {
    const gas = await this.auctionContract.methods
      .listItem(tokenId, biddingEndTimeStamp)
      .estimateGas({ from: account });

    // Call list item method of auctioncontract
    return await this.auctionContract.methods
      .listItem(tokenId, biddingEndTimeStamp)
      .send({
        from: account,
        gas: gas + this.extendGasLimit,
        gasPrice: this.defaultGasPrice,
      });
  }

  // Approve
  async approveTransfer(tokenId, account) {
    const gas = await this.contract.methods
      .approve(this.auctionMangerContractAddress, tokenId)
      .estimateGas({ from: account });

    // Call approve method of token contract
    return await this.contract.methods
      .approve(this.auctionMangerContractAddress, tokenId)
      .send({
        from: account,
        gas: gas + this.extendGasLimit,
        gasPrice: this.defaultGasPrice,
      });
  }

  // Bid on item
  async bidOnItem(listId, account, value) {
    const gas = await this.auctionContract.methods
      .bidItem(listId)
      .estimateGas({ from: account, value });

    // Call bid item method of auction contract
    return await this.auctionContract.methods.bidItem(listId).send({
      from: account,
      value,
      gas: gas + this.extendGasLimit,
      gasPrice: this.defaultGasPrice,
    });
  }

  // Settle auction
  async settleAuction(listId, account) {
    const gas = await this.auctionContract.methods
      .settleAuction(listId)
      .estimateGas({ from: account });

    // Call settle auction method of auction contract
    return await this.auctionContract.methods.settleAuction(listId).send({
      from: account,
      gas: gas + this.extendGasLimit,
      gasPrice: this.defaultGasPrice,
    });
  }

  // Total bid amount
  async totalBidAmount(listId, by) {
    return await this.auctionContract.methods
      .totalBidAmount(listId, by)
      .call({ from: by });
  }

  // Withdraw
  async withdraw(listId, account) {
    const gas = await this.auctionContract.methods
      .withdraw(listId)
      .estimateGas({ from: account });

    return await this.auctionContract.methods.withdraw(listId).send({
      from: account,
      gas: gas + this.extendGasLimit,
      gasPrice: this.defaultGasPrice,
    });
  }
}

export default Web3Instance;
