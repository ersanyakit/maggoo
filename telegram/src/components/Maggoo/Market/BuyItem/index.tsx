import { Avatar, Button, Link, Image, ModalContent, ModalBody, Modal, ModalFooter, ModalHeader, useDisclosure, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
 
import { useRouter } from "next/router";
import { getCharacterId, getCharacterNameByTokenId, getHashPower, getHashPowerStr, MAGGOO_ITEMS } from "@/app/utils/constants";
import useAxiosPost from "@/hooks/useAxios";
import Maggoo from "../../Maggoo";
  
  
interface NFTCardProps {
    item: any;
    tokenId: number;
  }
  
  const BuyItem = ({ item , tokenId }: NFTCardProps) => {
  const [characterInfo, setCharacterInfo] = useState<any>(null);
   const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
  const [sellModalOpen, setSellModalOpen] = useState<boolean>(false);

  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [selectedTokenId, setSelectedTokenId] = useState<string>("");

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
      if (newValue === "" || newValue.startsWith("0")) {
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
 
        <div className="nft_cards overflow-none">
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
               
                   <span className="w-full text-white text-2xl ">{item.price_amount.toString()} TON</span>     
                  <Button onClick={()=>{
                   
                  
                  }}
                    className="btn btn-primary w-full">
                    Buy
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
export default BuyItem;
