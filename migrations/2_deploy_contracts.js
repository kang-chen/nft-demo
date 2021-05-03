// const Color = artifacts.require("Color");
const Pokemon = artifacts.require("Pokemon");

module.exports = function(deployer) {
  // deployer.deploy(Color);
  deployer.deploy(Pokemon);
};
