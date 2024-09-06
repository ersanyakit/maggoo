import { ethers } from "hardhat";
import {formatEther, parseEther, parseUnits} from "ethers/lib/utils";
import { Factory } from "../typechain";
import moment from "moment";
const {DiamondFacetList} = require("../libs/facets.js")
const {getSelectors, FacetCutAction} = require("../libs/diamond.js")
const {MAGGOO_ITEMS} = require("../libs/maggo.js")
const hre = require("hardhat");

async function main() {
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);

    const chainId = hre.network.config.chainId;

    const ETHER_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
    const WRAPPED_CHILIZ_ADDRESS = "0x721EF6871f1c4Efe730Dce047D40D1743B886946"
    const WRAPPED_CHILIZ = "0x677F7e16C7Dd57be1D4C8aD1244883214953DC47"

    const ROUTER_KAYEN = "0xE2918AA38088878546c1A18F2F9b1BC83297fdD3"
    const ROUTER_KEWL = "0xA0BB8f9865f732C277d0C162249A4F6c157ae9D0"

    const [deployer, user1, user2, user3, user4, user5,user6,user7,user8,user9,user10] = await ethers.getSigners();
    console.log("DEPLOYER:",deployer.address)
    const MaggooFactory = await ethers.getContractFactory('Maggoo')
    const Maggoo = await MaggooFactory.attach("0x0eF0FF6583DAD4044462Ee1dBA352590A21BbB0D")
    await Maggoo.deployed()
    console.log('MAGGOO deployed:', Maggoo.address)



    const FactoryFacet = await ethers.getContractAt("Factory",Maggoo.address);
    const SettingsFacet = await ethers.getContractAt("Settings",Maggoo.address);
    const CharactersFacet = await ethers.getContractAt("Characters",Maggoo.address);



    const setMaggooConfigTx = await SettingsFacet.setMaggooConfig(parseEther("250"),parseEther("100"))
    await setMaggooConfigTx.wait();


    console.log("DONE.")

    



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
