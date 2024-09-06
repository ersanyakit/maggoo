"use client"; // Bu dosyanın client-side'da çalışacağını belirtir

import { useState, useEffect } from "react";
import styles from "../styles/styles.module.css"; // styles.css dosyasını import et
import { Avatar, Button, Link, Image, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Card, CardHeader, CardBody, useDisclosure, ModalContent, Modal, ModalBody, ModalFooter, ModalHeader, ScrollShadow, CardFooter } from "@nextui-org/react";
import {
    BODY_TOKEN_ID_START,
    MAGGO_DIAMOND_CONTRACT,
    MAGGO_NFT_CONTRACT,
    WEARABLE_TOKEN_ID_START,
    WearableSlot
} from "@/utils/constants";
import { generateRandomNumber, getCharacterId, getImageName, getWearableId } from "@/utils/helpers";
import useMoralisGetNFTs from "@/hooks/useMoralisGetNFTs";
import { ChevronDown } from "../Icons";
import React from "react";
import { MAGGOO_ITEMS } from "@/utils/NFTNames";
import Maggoo from "../maggoo";
import router from "next/router";
import { Energy } from "@/utils/Icons";
import FanTokens from "../FanTokens";
import WaitModal from "../modal/WaitModal";
import ErrorModal from "../modal/ErrorModal";
import { CHILIZ } from "@/utils/chains";
import {
    useSwitchNetwork,
    useWeb3Modal,
    useWeb3ModalAccount,
    useWeb3ModalProvider,
  } from "@web3modal/ethers/react";
  import {
    checkBalancesOfBody,
    GetContractAt,
    getChar,
    GetSigner,
    selectedClient,
  } from "@/utils/web3";
  
  import { getContract } from "viem";

const MaggooUpgrade = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const { address, chainId, isConnected } = useWeb3ModalAccount();
    const { switchNetwork } = useSwitchNetwork();
    const { walletProvider } = useWeb3ModalProvider();


  
    const userAccount = address
    const { isLoading, nfts } = useMoralisGetNFTs(userAccount);
    const [userNFTs, setUserNFTs] = useState<UserNFTs>()
    const [selectedTokenId, setSelectedTokenId] = useState<any>(null)
    const [selectedKeys, setSelectedKeys] = useState<any>();


    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalPlacement, setModalPlacement] = React.useState("auto");
    const [approveModalOpen, setApproveModalOpen] = useState<boolean>(false);
    const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
    const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

    const[characterInfo,setCharacterInfo] = useState<any>(null)
    const[balanceInfo,setBalanceInfo] = useState<any>(null)

    const [selectedItem,setSelectedItem] = useState<any>(null)



    type NFT = {
        token_id: string;
    };

    type UserNFTs = {
        [characterID: string]: {
            bodys: NFT[];
            subs: NFT[];
        };
    };


    const groupNFTsByCharacterID = (nfts: NFT[]) => {
        const groupedNFTs: { [characterID: string]: { bodys: NFT[]; subs: NFT[] } } = {};

        nfts.forEach((nft) => {
            const tokenId = BigInt(nft.token_id);
            let characterID: string;
            if (tokenId >= BigInt(BODY_TOKEN_ID_START)) {
                characterID = (tokenId / BigInt(BODY_TOKEN_ID_START)).toString();
                if (!groupedNFTs[characterID]) {
                    groupedNFTs[characterID] = { bodys: [], subs: [] };
                }
                groupedNFTs[characterID].bodys.push(nft);

            } else {
                characterID = (tokenId / BigInt(WEARABLE_TOKEN_ID_START)).toString();
                if (!groupedNFTs[characterID]) {
                    groupedNFTs[characterID] = { bodys: [], subs: [] };
                }
                groupedNFTs[characterID].subs.push(nft);
            }
        });

        return groupedNFTs;
    }



    useEffect(() => {
        if(isLoaded){
            return
        }
        setLoaded(false)
        if (nfts) {
            console.log(nfts.result)
            const groupedNFTs = groupNFTsByCharacterID(nfts.result);

            setUserNFTs(groupedNFTs);

            getSelectedBodyTokenId()
            setLoaded(true)


            
        }

    }, [nfts])

 

    const handleSelectItem = async (characterID:any, bodyItem : any,subs : any) => {
        setSelectedItem({
            characterID:characterID,
            bodyItem:bodyItem,
            subs:subs,
        })
        await fetchCharacterInfo(BigInt(bodyItem.token_id))


    }

    const fetchCharacterInfo = async(tokenId : any) => {
        let _characterInfo: any = await getChar(tokenId);
        if(_characterInfo){
            const _balanceInfo: any = await checkBalancesOfBody(userAccount, _characterInfo.tokenId);
            setCharacterInfo(_characterInfo)
            setBalanceInfo(_balanceInfo)
        }else{
            setCharacterInfo(null)
            setBalanceInfo(null)
        }
    }


    const wearableSlotToTokenId = (characterId : any, wearableSlot:WearableSlot) : any => {
        return (parseInt(characterId) * WEARABLE_TOKEN_ID_START) + wearableSlot;        
    }

    const bodyPartExists = (wearableSlot : WearableSlot) => {
        if(!balanceInfo){
            return {isEquipped:false,wearableItem:null}
        }
        if(!characterInfo){
            return {isEquipped:false,wearableItem:null}
        }

        let characterId = getCharacterId(characterInfo.tokenId)
        let wearableTokenID = wearableSlotToTokenId(characterId,wearableSlot)





        const checkWearableItem = balanceInfo.find((balanceTokenItem : any) => balanceTokenItem.tokenId === BigInt(wearableTokenID));


        let response = {isEquipped:checkWearableItem && checkWearableItem.extraParam > 0  ,wearableItem:checkWearableItem && checkWearableItem.extraParam > 0 && checkWearableItem}
        return response

    }


    const getSelectedBodyTokenId = () => {
        if(selectedItem){
            return selectedItem.bodyItem.token_id;
        }else{
            let randCharacterId = generateRandomNumber(1,MAGGOO_ITEMS.length) 
            let randTokenId = (randCharacterId * BODY_TOKEN_ID_START) + 1
            console.log("randCharacterId",randCharacterId,randTokenId)

            let _randomSelectedItem = {
                characterID:randCharacterId,
                bodyItem:{token_id:randTokenId},
                subs:[],
            }
            //setSelectedItem(_randomSelectedItem);
            return randTokenId
        }
    }

  
    const handleWaitModalOpen = () => {
        setWaitModalOpen(true);
      };
      const handleWaitModalClose = () => {
        setWaitModalOpen(false);
      };
    
      const handleErrorModalOpen = () => {
        setErrorModalOpen(true);
      };
      const handleErrorModalClose = () => {
        setErrorModalOpen(false);
      };

    const getSelectedBodyPartItemImage = (slot:WearableSlot) => {
        return getImageName(
              false,
              (parseInt(getSelectedBodyTokenId())/BODY_TOKEN_ID_START).toFixed(0),
              slot
            )
    }

    

    const getSelectedBodyPartTokenId = (slot:WearableSlot) => {
        let characterId : any = getSelectedBodyTokenId() / BODY_TOKEN_ID_START
        let tokenID = (parseInt(characterId) * WEARABLE_TOKEN_ID_START) + slot
        console.log("getSelectedBodyPartTokenId",parseInt(characterId),getSelectedBodyTokenId(),tokenID)
        return tokenID
    }

    const handleUpgrade = async () => {
        console.log("selectedItem",selectedItem)

        if (isConnected !== true) {
            open();
            return;
          } else if (chainId !== CHILIZ.chainId) {
            switchNetwork(CHILIZ.chainId);
            return;
          }
          handleWaitModalOpen();
        
          const signer = await GetSigner(walletProvider);

          try {
            const nftContract = getContract({
              address: MAGGO_NFT_CONTRACT.address,
              abi: MAGGO_NFT_CONTRACT.abi,
              client: selectedClient,
            });

            const isApproved = await nftContract.read.isApprovedForAll([address, MAGGO_DIAMOND_CONTRACT.address]);

            if (!isApproved) {
              const contract = GetContractAt(MAGGO_NFT_CONTRACT);
              // @ts-ignore
              const tx = await contract.connect(signer).setApprovalForAll(MAGGO_DIAMOND_CONTRACT.address, true);
              await tx.wait();
              handleWaitModalClose();
            } 


            if(selectedItem.subs.length == 0){
                handleErrorModalOpen();
                return
            }

            const subItems = selectedItem.subs.map((item :any )=> item.token_id);
            const bodyId = selectedItem.bodyItem.token_id;
            const contract = GetContractAt(MAGGO_DIAMOND_CONTRACT);
            // @ts-ignore
            const upgradeTx = await contract.connect(signer).upgrade(bodyId, subItems);
            await upgradeTx.wait();
            handleWaitModalClose();



          } catch (error) {
            handleWaitModalClose();
            handleErrorModalOpen();
          }      
        
    }


    const MaggoPart = (props:{wearableItem:WearableSlot}) => {

        return (
            <>
              {selectedItem ? (
                <Button
                  isIconOnly
                  disabled
                  className="w-full min-h-[120px] h-full bg-transparent flex items-center justify-center"
                >
                  <Maggoo
                    character={{ tokenId: getSelectedBodyPartTokenId(props.wearableItem) }}
                    isMarketItem={true}
                  />
                </Button>
              ) : (
                <Image className="w-full h-full p-4"  src="/assets/Shimmer_Worm.svg" />
              )}
            </>
          );

    }

    return (
        <>
            <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
            <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />
            <Modal
                size="3xl"
                className="bg-header-bg black-border"
                isOpen={isOpen}
                placement={"auto"}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[#f9843f]">Select MAGGOO</ModalHeader>
                            <ModalBody>
                                <ScrollShadow hideScrollBar className="h-[500px]">
                                    {isLoaded && userNFTs && Object.entries(userNFTs as UserNFTs).length > 0 && (
                                        <div className="w-full flex flex-col gap-2 nft_cards">
                                            {Object.entries(userNFTs as UserNFTs).map(([characterID, { bodys, subs }]) => (
                                                bodys.length > 0 && subs.length > 0 && <Card className="bg-header-bg " shadow="none" key={characterID}>
                                                    <CardHeader>
                                                        <div className="w-full bg-[#f9843f] text-white rounded-lg p-2  border-2 border-black ">
                                                            {MAGGOO_ITEMS[parseInt(characterID)]}
                                                        </div>
                                                    </CardHeader>

                                                    <CardBody className="grid grid-cols-2 sm:grid-cols-1 gap-2">

                                                        {bodys.map((bodyItem, bodyIndex) => (
                                                            <Card  key={`bodyItem${bodyIndex}`}  isPressable onPress={()=>{
                                                                handleSelectItem(characterID, bodyItem,subs)
                                                                onClose()
                                                            }} isHoverable className="item border-2 border-black ">
                                                                <CardHeader>
                                                                    <span className="text-white">{bodyItem.token_id}</span>
                                                                </CardHeader>
                                                                <CardBody>
                                                                    <div className="w-full overflow-none w-[185px] h-[260px]">
                                                                        <Maggoo character={{ tokenId: bodyItem.token_id }} isMarketItem={true} />
                                                                    </div>
                                                                </CardBody>
                                                            </Card>
                                                        ))}

                                                    </CardBody>
                                                    <CardFooter>
                                                        <div className="flex flex-row gap-2">

                                                            {subs.map((subItem, subItemIndex) => (
                                                                <Card key={`subItem${subItemIndex}`}  fullWidth className="w-full item border-2 border-black  overflow-none min-w-[185px] h-[260px]">
                                                                    <CardHeader>
                                                                        <span className="text-white">{subItem.token_id}</span>
                                                                    </CardHeader>
                                                                    <CardBody>
                                                                        <div className="w-full overflow-none w-[185px] h-[260px]">
                                                                            <Maggoo character={{ tokenId: subItem.token_id }} isMarketItem={true} />
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            ))}


                                        </div>
                                    )}

                                </ScrollShadow>


                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>





            {isLoaded &&  <div className="w-full h-full flex justify-center items-center">


<div className="w-full max-w-3xl justify-between flex flex-col   h-full rounded-xl p-10 border-2 border-black bg-header-bg">
    <div className="w-full ">
        <div className="w-full flex overflow-hidden ">
            <FanTokens />
        </div>
    </div>
    <div className="flex w-full order h-full grid grid-cols-8 gap-4 justify-between items-center">
        <div className="col-span-2 sm:col-span-4 sm:order-1 w-full flex flex-col gap-5 h-full ">


            <div className="flex items-center justify-center h-full border-2 border-black rounded-xl ">
                <div className="w-full h-full">
                <MaggoPart wearableItem={WearableSlot.Headgear}/>
                </div>

            </div>

            <div className="flex items-center justify-center h-full border-2 border-black rounded-xl">
                <div className="w-full h-full">
                    <MaggoPart wearableItem={WearableSlot.LeftHand}/>
                </div>
            </div>
            <div className="flex items-center justify-center h-full border-2 border-black rounded-xl">
                <div className="w-full h-full">
                    <MaggoPart wearableItem={WearableSlot.ChestArmor}/>
                </div>
            </div>
        </div>

        <div className="col-span-4 sm:order-3 sm:col-span-8 w-full flex flex-col gap-5 justify-center items-center h-full">
            <div className=" w-full h-full w-[250px] flex items-center justify-center z-[5]">
                <div className="w-full h-full flex items-center justify-center bottom-[100px] z-[6] nft_cards">

                    <Card  shadow="none" className="min-w-[300px] min-h-[320px] bg-header-bg border-2 border-black item" isPressable onPress={() => {
                        onOpen()
                    }}>
                        <CardBody>
                            {
                                selectedItem ? <>
                                 <Maggoo character={{ tokenId: getSelectedBodyTokenId() }} isMarketItem={true} />

                                </> : <>
                                
                                <Image className="w-full h-full p-4"  src="/assets/Shimmer_Worm.svg" />

                                </>
                            }
                        </CardBody>
                    </Card>


                </div>
            </div>
            {
    selectedItem && <div className="w-full justify-center items-center flex flex-col">
    <p className="text-center">{characterInfo && characterInfo.name}</p>
    <div className="flex gap-2">
        <Energy height={20} color={"#f88440"} />
        <span>{characterInfo && Number(characterInfo.hashPower)}</span>
    </div>
</div>
            }
        
            <div className="hidden w-full flex flex-col gap-2">
                    <span>Body { bodyPartExists(WearableSlot.Body)?.wearableItem ? "YES": "NO"} </span>
                    <span>Chest { bodyPartExists(WearableSlot.ChestArmor)?.wearableItem ? "YES": "NO"} </span>
                    <span>Head { bodyPartExists(WearableSlot.Headgear)?.wearableItem ? "YES": "NO"} </span>
                    <span>Face { bodyPartExists(WearableSlot.Face)?.wearableItem ? "YES": "NO"} </span>
                    <span>Backpack { bodyPartExists(WearableSlot.Backpack)?.wearableItem ? "YES": "NO"} </span>
                    <span>LeftHand { bodyPartExists(WearableSlot.LeftHand)?.wearableItem ? "YES": "NO"} </span>
                    <span>RightHand { bodyPartExists(WearableSlot.RightHand)?.wearableItem ? "YES": "NO"} </span>
             


            </div>
            <div className="w-full grid grid-cols-1 gap-2 px-5 justify-center pb-3">

{
    selectedItem && <Button size="lg" onClick={() => handleUpgrade()}  className="btn btn-primary w-full text-xl">
        Upgrade
    </Button>

}
            
            <Button size="lg"  onClick={() => router.push("/eggs")} className="btn btn-primary w-full text-xl" >
                Buy Egg
            </Button>
            </div>
        </div>

        <div className="col-span-2 sm:col-span-4 sm:order-2 w-full flex flex-col gap-5 h-full">
            <div className="flex items-center justify-center h-full border-2 border-black rounded-xl ">
                <div className="w-full h-full">
                    <MaggoPart wearableItem={WearableSlot.Face}/>
                </div>
            </div>

            <div className="flex items-center justify-center h-full border-2 border-black rounded-xl">
                <div className="w-full h-full">
                    <MaggoPart wearableItem={WearableSlot.RightHand}/>
                </div>
            </div>
            <div className="flex items-center justify-center h-full border-2 border-black rounded-xl">
                <div className="w-full h-full">
                    <MaggoPart wearableItem={WearableSlot.Backpack}/>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
}

       

        </>
    );
};

export default MaggooUpgrade;

