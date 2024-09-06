import { ethers } from "hardhat";
const {DiamondFacetList} = require("../libs/facets.js")
const {getSelectors, FacetCutAction} = require("../libs/diamond.js")

async function main() {
    ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);
    const [deployer, otherAccount] = await ethers.getSigners();
    // deploy DiamondCutFacet

    console.log(deployer.address)

    const KEWL_DIAMOND_ADDRESS = "0xBD1c77deB87B26E4e3c24Ad2148b0e0793BA1355"
    const KEWLDIAMONDFactory = await ethers.getContractFactory('MaggooDiamond')
    const KEWLDIAMOND = await KEWLDIAMONDFactory.attach(KEWL_DIAMOND_ADDRESS)
    await KEWLDIAMOND.deployed()
    console.log('KEWLDIAMOND deployed:', KEWLDIAMOND.address)


    const cut = []
    const facetList = ['Factory'];
    for (const FacetName of facetList) {
        const Facet = await ethers.getContractFactory(FacetName);
        // @ts-ignore
        const facet = await Facet.deploy()
        await facet.deployed()
        console.log(`${FacetName} deployed: ${facet.address}`)
        cut.push({
            target: facet.address,
            action: FacetCutAction.Replace,
            selectors: getSelectors(facet)
        })
    }
    const tx = await KEWLDIAMOND.diamondCut(cut, ethers.constants.AddressZero, '0x');
    await tx.wait(2);
    console.log("Updated");

    console.log("DONE!");







}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
