const Token = artifacts.require("NiftyToken");

module.exports = async function (deployer) {
  await deployer.deploy(Token);
};
