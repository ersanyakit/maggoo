import {time, loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect, use} from "chai";
import {ethers} from "hardhat";
import {BigNumber} from "ethers";
import {AbiCoder, formatEther, formatUnits, parseEther, parseUnits} from 'ethers/lib/utils';
import moment from "moment";
import {base64} from "ethers/lib.esm/utils";
import { Factory } from "../typechain";

const {DiamondFacetList} = require("../libs/facets.js")

const {MAGGOO_ITEMS} = require("../libs/maggo.js")

const {getSelectors, FacetCutAction} = require("../libs/diamond.js")
ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.OFF);

describe("Deploy KEWL STAKE", function () {
    
    async function deploy() { 

        const ETHER_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

        const [deployer, user1, user2, user3, user4, user5,user6,user7,user8,user9,user10] = await ethers.getSigners();
        console.log("DEPLOYER:",deployer.address)
        const MaggooFactory = await ethers.getContractFactory('Maggoo')
        const Maggoo = await MaggooFactory.deploy("MAGGOO LAND","MAGGOO")
        await Maggoo.deployed()
        console.log('MAGGOO deployed:', Maggoo.address)


        const MaggooNFTFactory = await ethers.getContractFactory("MaggooNFT");
        const MaggooNFT = await MaggooNFTFactory.deploy(Maggoo.address);
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

        const initCharactersTx = await CharactersFacet.initCharacters(MAGGOO_ITEMS);
        await initCharactersTx.wait();

        const setMaggooNFTContractTx = await SettingsFacet.setMaggooNFTContract(MaggooNFT.address)
        await setMaggooNFTContractTx.wait()

        const setMaggooConfigTx = await SettingsFacet.setMaggooConfig(parseEther("200"),parseEther("100"))
        await setMaggooConfigTx.wait();

        const WRAPPED_TOKEN_FACTORY = await ethers.getContractFactory("WETH9")
        const WRAPEPD_TOKEN = await WRAPPED_TOKEN_FACTORY.deploy();

        const setWETH9Token = await SettingsFacet.setWETH9Token(WRAPEPD_TOKEN.address,WRAPEPD_TOKEN.address);
        await setWETH9Token.wait();

        const setFeeReceiver = await SettingsFacet.setFeeReceiver(deployer.address);
        await setFeeReceiver.wait();

        const setETHAddress = await SettingsFacet.setETH(ETHER_ADDRESS);
        await setETHAddress.wait();

        return {
            Maggoo,
            FactoryFacet,
            SettingsFacet,
            CharactersFacet,
            MaggooNFT,
            deployer,
            user1,
            user2,
            user3,
            user4,
            user5,
            user6,
            user7,
            user8,
            user9,
            user10,
            ETHER_ADDRESS,
        };

    }

    const getRandomNumber = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    describe("Deployment", function () {


        it("Mint Random", async function(){

            const {
                Maggoo,
                deployer,
                FactoryFacet,
                SettingsFacet,
                CharactersFacet,
                user1,
                user2,
                user3,
                user4,
                user5,
                user6,
                user7,
                user8,
                user9,
                user10,
                ETHER_ADDRESS
            } = await loadFixture(deploy);


           const isWearableItem = await FactoryFacet.verifyWearableItem(1000001,200001)
           console.log("WEARABLE",isWearableItem)


           const [eggFee,mysteryboxFee] = await SettingsFacet.getEggAndMysteryBoxFees(); 

           
    
           const getMintParams = (base:any, maggooId : any, tokenIndex : any, subIndex : any = "") => {
        
            const BODY_TOKEN_ID_START     = 1000000000000;
            const WEARABLE_TOKEN_ID_START =  1000;

 
            return {
                      isBase:base,
                      entryPoint: (base ? getRandomNumber(1,BODY_TOKEN_ID_START) :  getRandomNumber(1,WEARABLE_TOKEN_ID_START)) +   Math.floor(Date.now() / 1000)
                 }
           }
   

           const getRandomMintParams = (base:any, limit:any) =>{
      

                function getRandomElement(): any {
                    const array = ["a", "b", "c", "d", "e", "f"];
                    const item = [1, 2, 3, 4, 5, 6];
                    const randomIndex = Math.floor(Math.random() * array.length);
                    return {key:item[randomIndex], value:array[randomIndex]};
                }
                
                let createParams = []
                for (let i = 1; i <= limit; i++) {
                    const characterIndex = getRandomNumber(1, 62);
                    if(base){
                        const getItemCount = (index:any) => {
                            return 1000 - ((index - 1) * 10)
                        }
                        const item = getRandomNumber(1,getItemCount(characterIndex))
                        createParams.push(getMintParams(true,characterIndex,item,""))
                    }else{
                        let item = getRandomElement()
                        createParams.push(getMintParams(false,characterIndex,item.key,item.value))
                    }
                }

                return createParams;
           }



 

            /*/ 1 numarali maggo'nun ilk 3 vucudunun mintlenmesi
           let characterIndex = 1
           let maggoo1Body1 = getMintParams(true,characterIndex,1,"");    
           let maggoo1Body2 = getMintParams(true,characterIndex,2,"");        
           let maggoo1Body3 = getMintParams(true,characterIndex,3,"");        
            let createParams : any = [maggoo1Body1,maggoo1Body2,maggoo1Body3]
            */

            let createParams = getRandomMintParams(true,1) // rastgele 5 tane body uret
            let depositOverrides = {
                value : eggFee.mul(createParams.length)
            }



            console.log("createParamsLength",createParams.length)
            const createBodyGas = await FactoryFacet.estimateGas.create(createParams,depositOverrides)


            console.log("GAS",createBodyGas)
            const createBodyTx = await FactoryFacet.create(createParams,depositOverrides)
            await createBodyTx.wait()
           
            /*
            // 1 numarali maggo'nun ilk 3 vucut parcalarinin mintlenmesi
            const ChestArmor =  getMintParams(false,characterIndex,1, "a");  
            const Headgear =  getMintParams(false,characterIndex,2,"b");  
            const Backpack = getMintParams(false,characterIndex,3, "c");  
            const RightHand = getMintParams(false,characterIndex,4,"d");  
            const LeftHand = getMintParams(false,characterIndex,5,"e");  
            const Face = getMintParams(false,characterIndex,6,"f");  
            let createSubParams : any = [ChestArmor,Headgear,Backpack,RightHand,LeftHand,Face]
            */

            let createSubParams = getRandomMintParams(false,15);//rastgele 5 sub yarat

            let depositOverridesSub = {
                value : mysteryboxFee.mul(createSubParams.length)
            }

           const createSubTx = await FactoryFacet.create(createSubParams,depositOverridesSub)
           await createSubTx.wait()


           const getCharacters = await CharactersFacet.getCharacters();

         //  console.log(getCharacters)

           
        });   




        it("Test Random", async function(){

            const {
                Maggoo,
                deployer,
                FactoryFacet,
                SettingsFacet,
                CharactersFacet,
                user1,
                user2,
                user3,
                user4,
                user5,
                user6,
                user7,
                user8,
                user9,
                user10,
                ETHER_ADDRESS
            } = await loadFixture(deploy);
 
                for (let i = 0; i < 10; i++) {
                    const entryPoint = Math.floor(Math.random() * 10000000) + 1;
                    let createParams = [{
                        isBase:false,
                        entryPoint:entryPoint
                    },
                    {
                        isBase:false,
                        entryPoint:entryPoint
                    }]

                    let depositOverrides = {
                        value:parseEther('200')
                    }
                    const createTx = await FactoryFacet.create(createParams,depositOverrides)
                    await createTx.wait()
            
                    try {
                        const result = await FactoryFacet.getRandomNumber(entryPoint,i, 6);
                        console.log(`Iteration ${i + 1}: Random Number = ${result}`);
                    } catch (error) {
                        console.error(`Error in iteration ${i + 1}:`, error);
                    }
                }
         
        });   

    });

});
