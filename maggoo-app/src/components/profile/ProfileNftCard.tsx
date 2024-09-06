import { getTokenWearables } from "@/utils/constants";
import { getChar, getMetadata } from "@/utils/web3";
import { Avatar, Button, Link, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { formatEther } from "ethers";
import { MAGGOO_ITEMS } from "@/utils/NFTNames";
import { useRouter } from "next/router";
import axios from "axios";
import Maggoo from "../maggoo";
import {
  useSwitchNetwork,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from "@web3modal/ethers/react";
import { CHILIZ } from "@/utils/chains";
import SellModal from "./SellModal";

const ProfileNFTCard = ({ collection }: any) => {
  const router = useRouter();
  const [characterInfo, setCharacterInfo] = useState<any>(null);
  const { walletProvider } = useWeb3ModalProvider();
  const { switchNetwork } = useSwitchNetwork();
  const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
  const [sellModalOpen, setSellModalOpen] = useState<boolean>(false);

  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [selectedTokenId, setSelectedTokenId] = useState<string>("");

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

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

  const handleSellModalOpen = () => {
    setSellModalOpen(true);
  };
  const handleSellModalClose = () => {
    setSellModalOpen(false);
  };

  const fetchCharacterInfo = async (token_id: any) => {
    const _characterInfo = await getChar(token_id);
    setCharacterInfo(_characterInfo);
  };

  useEffect(() => {
    if (collection) {
      fetchCharacterInfo(collection);
    }
  }, [collection]);

  const handleSellBTN = async (token_id: string) => {
    if (isConnected !== true) {
      open();
    }
    if (chainId !== CHILIZ.chainId) {
      switchNetwork(CHILIZ.chainId);
    }

    try {
      setSelectedTokenId(token_id);
      handleSellModalOpen();
    } catch (error) {}
  };

  return (
    <>
      <SellModal
        character={characterInfo}
        isOpen={sellModalOpen}
        onClose={handleSellModalClose}
        selectedToken={selectedTokenId}
      />
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
                <div className="flex flex-row w-full gap-5 justify-between h-full items-center">
                  <Button disabled className="btn w-full">
                    Stake
                  </Button>
                  <Button
                    onClick={() => handleSellBTN(characterInfo.tokenId)}
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
      )}
    </>
  );
};
export default ProfileNFTCard;
