import { Avatar, Button, Link, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
 
import { useRouter } from "next/router";
import Maggoo from "../Maggoo";
import { getCharacterId, getHashPower, getHashPowerStr, MAGGOO_ITEMS } from "@/app/utils/constants";
  
  
interface NFTCardProps {
    tokenId: number;
  }
  
  const NFTCard = ({ tokenId }: NFTCardProps) => {
  const [characterInfo, setCharacterInfo] = useState<any>(null);
   const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
  const [sellModalOpen, setSellModalOpen] = useState<boolean>(false);

  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [selectedTokenId, setSelectedTokenId] = useState<string>("");

   

  return (
    <>
 
        <div className="nft_cards">
          <div className="item">
            <div className="item_header">
              <div className="title pl-14 w-full">
                <span className="w-full block text-start w-32 truncate text-white">
                 {MAGGOO_ITEMS[getCharacterId(BigInt(tokenId))]}
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
                  <Button disabled className="btn w-full">
                    Stake
                  </Button>
                  <Button
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
