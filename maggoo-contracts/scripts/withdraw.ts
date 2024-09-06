import { ethers } from "hardhat";
import {formatUnits, parseEther, parseUnits} from "ethers/lib/utils";
const {DiamondFacetList} = require("../libs/facets.js")
const {getSelectors, FacetCutAction} = require("../libs/diamond.js")

async function main() {
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);
  const [deployer, otherAccount] = await ethers.getSigners();
  // deploy DiamondCutFacet



  const KEWLDEXFactory = await ethers.getContractFactory("MaggooDiamond");
  const KEWLDEXContract = await KEWLDEXFactory.attach("0xBD1c77deB87B26E4e3c24Ad2148b0e0793BA1355");


  const withdraw = await KEWLDEXContract.connect(deployer).withdrawETH()
  await withdraw.wait()
  console.log("done")


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
