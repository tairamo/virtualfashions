const { dirname } = require("path");
require("dotenv").config({ path: dirname(__dirname) + "/.env" });

const Token = artifacts.require("NiftyToken");
const AuctionManager = artifacts.require("AuctionManager");

module.exports = async function (deployer) {
  const tokenInstance = await Token.deployed();

  await deployer.deploy(
    AuctionManager,
    tokenInstance.address,
    process.env.COMMISSION_RATE
  );
  const auctionManagerInstance = await AuctionManager.deployed();

  console.log(await auctionManagerInstance.getCommissionRate());
  console.log(await auctionManagerInstance.getNiftyTokenContractAddress());
};
