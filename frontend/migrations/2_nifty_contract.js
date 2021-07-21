const NiftyToken = artifacts.require("NiftyToken");

module.exports = async function (deployer) {
  await deployer.deploy(NiftyToken);
};
