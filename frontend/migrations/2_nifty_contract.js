const TokenToken = artifacts.require("TokenToken");

module.exports = async function (deployer) {
  await deployer.deploy(TokenToken);
};
