const Token = artifacts.require("NFTToken");

module.exports = async function (deployer) {
  await deployer.deploy(Token);
};
