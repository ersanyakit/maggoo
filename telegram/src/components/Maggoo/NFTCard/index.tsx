import { Avatar, Button, Link, Image, ModalContent, ModalBody, Modal, ModalFooter, ModalHeader, useDisclosure, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
 
import { useRouter } from "next/router";
import Maggoo from "../Maggoo";
import { getCharacterId, getCharacterNameByTokenId, getHashPower, getHashPowerStr, getIsBase, MAGGOO_ITEMS } from "@/app/utils/constants";
import useAxiosPost from "@/hooks/useAxios";
import { initHapticFeedback } from "@telegram-apps/sdk-react";
  
  
interface NFTCardProps {
    item: any;
    tokenId: number;
  }
  
  const NFTCard = ({ item , tokenId }: NFTCardProps) => {
  const [characterInfo, setCharacterInfo] = useState<any>(null);
   const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
  const [sellModalOpen, setSellModalOpen] = useState<boolean>(false);

  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [selectedTokenId, setSelectedTokenId] = useState<string>("");
  const hapticFeedback = initHapticFeedback();

  const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
  const [modalPlacement, setModalPlacement] = useState("auto");
  const { data, error, loading, postData } = useAxiosPost('/maggoo/sell');
  const [isSold, setIsSold] = useState(false)
  const [sellParam, setSellParam] = useState<any>({
    price: ""
  });

  const handleInputChanges = (
    event: React.ChangeEvent<HTMLInputElement>,
    formName: string
  ) => {
    let newValue = event.target.value.toString().replace(",", ".");
 
    if (formName === "price") {
      const regex = /^[0-9]*\.?[0-9]*$/;

      if (!regex.test(newValue)) {
        return;
      }
      if (newValue === "") {
        setSellParam((prevFormData : any) => ({
          ...prevFormData,
          [formName]: ""
        }));
        return;
      }
    }

    setSellParam((prevFormData : any) => ({
      ...prevFormData,
      [formName]: newValue
    }));
  };


  const handleSell = async () => {
    const nftInfo: any = {
        item: item,
        price:sellParam.price
    };
 
    await postData(nftInfo).then(()=>{
      onClose()
      setIsSold(true)
    }) 
  }

  return (
    <>
         <Modal
                    size="full"
                    className="bg-transparent backdrop-blur-md "
                    isOpen={isOpen}
                    placement={"auto"}
                    onOpenChange={onOpenChange}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-white">{MAGGOO_ITEMS[getCharacterId(BigInt(tokenId))]} Sell</ModalHeader>
                                <ModalBody>
                                    <div className="w-full h-full p-2 gap-2 flex items-center justify-center">
                                    <Maggoo tokenId={tokenId} isMarketItem={false} />
                                    </div>
                                </ModalBody>
                                <ModalFooter className="flex flex-col gap-5 w-full">
                <Input
                size="lg"
                label={"Price"}
                classNames={{
                  label:"text-2xl !text-white"
                }}
                labelPlacement="outside"
                  placeholder="0.00"
                  endContent={
                    <div className="flex text-black">
                    <span>TON</span>
                    </div>
                  }
                  onChange={(e) => handleInputChanges(e, "price")}
                  value={sellParam.price}
                  radius="lg"
                  className="text-lg w-full  text-white"
                />
                                    <Button isDisabled={isSold} className="btn-primary w-full py-6 text-2xl" onPress={()=>{
                                      handleSell()
                                    }}>
                                        Sell
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
        <div className="nft_cards">
          <div className="item">
            <div className="item_header">
              <div className="title pl-14 w-full">
                <span className="w-full block text-start w-32 truncate text-white">
                 {getCharacterNameByTokenId(BigInt(tokenId))}
                </span>
              </div>
              <div className="badge-wrapper">
                <div className="badge">
                  <div>
                    <span>
                     {getHashPowerStr(BigInt(tokenId))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center relative w-full h-full bounce bg-transparent">
              <Maggoo tokenId={tokenId} isMarketItem={false} />
            </div>
            <div className="item_footer">
              <div className="border-top"></div>
              <div className="flex items-center h-full w-full flex-col">
                <div className="flex flex-row w-full gap-5 justify-between h-full items-center">
                  <Button isDisabled={true} className="btn btn-primary w-full">
                    Stake
                  </Button>
                  <Button onClick={()=>{
                    hapticFeedback.impactOccurred("heavy")

                  }}  className="btn btn-primary w-full" isDisabled={!getIsBase(tokenId)}>Upgrade</Button>
                  <Button isDisabled={isSold}  onClick={()=>{
                    hapticFeedback.impactOccurred("heavy")

                    onOpen()
                  
                  }}
                    className="btn btn-primary w-full">
                    Sell
                  </Button>
                </div>
              </div>
            </div>
            <div className="top-border"></div>
            <div className="bottom-border"></div>
            <div className="left-border"></div>
            <div className="right-border"></div>
          </div>
        </div>
   
    </>
  );
};
export default NFTCard;
