const { dirname } = require("path");
require("dotenv").config({ path: dirname(__dirname) + "/.env" });

const NiftyToken = artifacts.require("NiftyToken");
const AuctionManager = artifacts.require("AuctionManager");

module.exports = async function (deployer) {
  const niftyInstance = await NiftyToken.deployed();

  await deployer.deploy(
    AuctionManager,
    niftyInstance.address,
    process.env.COMMISSION_RATE
  );
  const auctionManagerInstance = await AuctionManager.deployed();

  console.log(await auctionManagerInstance.getCommissionRate());
  console.log(await auctionManagerInstance.getNiftyTokenContractAddress());
};
