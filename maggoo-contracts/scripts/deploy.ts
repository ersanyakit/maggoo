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
    const Maggoo = await MaggooFactory.deploy("MAGGOO","MAGGOO")
    await Maggoo.deployed()
    console.log('MAGGOO deployed:', Maggoo.address)


    const MaggooNFTFactory = await ethers.getContractFactory("MaggooNFT");
    const MaggooNFT = await MaggooNFTFactory.deploy(Maggoo.address);
    await MaggooNFT.deployed()
    console.log("Maggoo NFT Address",MaggooNFT.address)


    const cut = []
    for (const FacetName of DiamondFacetList) {
        console.log("FACET NAME:", FacetName)
        const Facet = await ethers.getContractFactory(FacetName);
        // @ts-ignore
        const facet = await Facet.deploy()
        await facet.deployed()
        console.log(`${FacetName} deployed: ${facet.address}`)
        cut.push({target: facet.address, action: FacetCutAction.Add, selectors: getSelectors(facet)})
    }
    const tx = await Maggoo.diamondCut(cut, ethers.constants.AddressZero, '0x');
    await tx.wait(1);

    console.log("Facets Added Successfuly.")

    const FactoryFacet = await ethers.getContractAt("Factory",Maggoo.address);
    const SettingsFacet = await ethers.getContractAt("Settings",Maggoo.address);
    const CharactersFacet = await ethers.getContractAt("Characters",Maggoo.address);


    console.log("WAIT:initCharacters")
    const initCharactersTx = await CharactersFacet.initCharacters(MAGGOO_ITEMS);
    await initCharactersTx.wait();
    console.log("END:initCharacters")

    console.log("WAIT:setMaggooNFTContract")
    const setMaggooNFTContractTx = await SettingsFacet.setMaggooNFTContract(MaggooNFT.address)
    await setMaggooNFTContractTx.wait()
    console.log("END:setMaggooNFTContract")


    const setMaggooConfigTx = await SettingsFacet.setMaggooConfig(parseEther("200"),parseEther("100"))
    await setMaggooConfigTx.wait();

    const setWETH9Token = await SettingsFacet.setWETH9Token(WRAPPED_CHILIZ_ADDRESS,WRAPPED_CHILIZ);
    await setWETH9Token.wait();

    const setDEXRouter = await SettingsFacet.setDEXRouter(ROUTER_KEWL,ROUTER_KAYEN);
    await setDEXRouter.wait() ;   

    const setFeeReceiver = await SettingsFacet.setFeeReceiver(deployer.address);
    await setFeeReceiver.wait();

    const setETHAddress = await SettingsFacet.setETH(ETHER_ADDRESS);
    await setETHAddress.wait();

    const setMarketFeeReceiver = await SettingsFacet.setMarketFeeReceiver(deployer.address);
    await setMarketFeeReceiver.wait();


    console.log("WAIT:setMarketFeeTx")
    const setMarketFeeTx = await SettingsFacet.setMarketFee(ethers.utils.parseEther("0.02"));
    await setMarketFeeTx.wait();
    console.log("DONE:setMarketFeeTx")

    console.log("WAIT:setFanTokenWrapper")
    const setFanTokenWrapperTx = await SettingsFacet.setFanTokenWrapper("0xAEdcF2bf41891777c5F638A098bbdE1eDBa7B264")
    await setFanTokenWrapperTx.wait();
    console.log("DONE:setFanTokenWrapperTx")



    console.log("DONE.")

    



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
