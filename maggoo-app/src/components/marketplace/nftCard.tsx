import { getTokenWearables } from "@/utils/constants";
import { getChar, getMetadata } from "@/utils/web3";
import { Avatar, Button, Link, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { formatEther } from "ethers";
import { MAGGOO_ITEMS } from "@/utils/NFTNames";
import { useRouter } from "next/router";
import axios from "axios";
import Maggoo from "../maggoo";

const NFTCard = ({ collection }: any) => {
  const router = useRouter();
  const [characterInfo, setCharacterInfo] = useState<any>(null);

  const fetchCharacterInfo = async (tokenId: any) => {
    const _characterInfo = await getChar(tokenId.toString());
    setCharacterInfo(_characterInfo);
  };

  useEffect(() => {
    if (collection) {
      fetchCharacterInfo(collection.tokenId);
    }
  }, [collection]);

  useEffect(() => {}, [characterInfo]);

  return (
    <>
      {collection && characterInfo && (
        <div className="nft_cards">
          <div className="item">
            <div className="item_header">
              <div className="title pl-14 w-full">
                <span className="w-full block text-start w-32 truncate">
                  {characterInfo && characterInfo.name}
                </span>
              </div>
              <div className="badge-wrapper">
                <div className="badge">
                  <div>
                    <span>
                      {characterInfo && characterInfo.hashPower.toString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center relative w-full h-full bounce bg-transparent">
              <Maggoo character={characterInfo} isMarketItem={false} />
            </div>
            <div className="item_footer">
              <div className="border-top"></div>
              <div className="flex items-center h-full w-full flex-col">
                <div className="flex flex-row w-full justify-center h-full items-center">
                  <div className="flex gap-2 items-center justify-start w-full">
                    <Avatar
                      src="/logo/chz.svg"
                      alt="chz"
                      className="bg-transparent w-[20px] h-[20px]"
                    />
                    <p className="text-md text-primary-100">
                      {Number(
                        formatEther(
                          BigInt(collection.price_per_token.toString())
                        )
                      ).toFixed(2)}{" "}
                      CHZ
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      router.push(
                        `/marketplace/${collection.collectionId}/${collection.itemId}`
                      )
                    }
                    className="btn btn-primary">
                    View
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
      )}
    </>
  );
};
export default NFTCard;
