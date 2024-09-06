import { ethers } from "hardhat";
const {DiamondFacetList} = require("../libs/facets.js")
const {getSelectors, FacetCutAction} = require("../libs/diamond.js")

async function main() {
    ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);
    const [deployer, otherAccount] = await ethers.getSigners();
    // deploy DiamondCutFacet


    const KEWL_DIAMOND_ADDRESS = "0x0eF0FF6583DAD4044462Ee1dBA352590A21BbB0D"

    const KEWLDIAMONDFactory = await ethers.getContractFactory('Maggoo')
    const KEWLDIAMOND = await KEWLDIAMONDFactory.attach(KEWL_DIAMOND_ADDRESS)
    await KEWLDIAMOND.deployed()
    console.log('KEWLDIAMOND deployed:', KEWLDIAMOND.address)


    const cut = []
    const facetList = ['Factory'];

    for (const FacetName of facetList) {
       
        const facet = await ethers.getContractAt(FacetName,KEWLDIAMOND.address);
        console.log(`${FacetName} deployed: ${facet.address}`)
        cut.push({
            target: ethers.constants.AddressZero,
            action: FacetCutAction.Remove,
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
