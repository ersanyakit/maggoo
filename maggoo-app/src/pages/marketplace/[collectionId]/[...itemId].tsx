import React, { useEffect, useState } from "react";
import Head from "next/head";
import Maggoo from "@/components/maggoo";
import ErrorModal from "@/components/modal/ErrorModal";
import SuccessModal from "@/components/modal/SuccessModal";
import WaitModal from "@/components/modal/WaitModal";

import { CHILIZ } from "@/utils/chains";
import { getTokenWearables, MAGGO_DIAMOND_CONTRACT } from "@/utils/constants";
import { getChar, GetContractAt, getItem, GetSigner } from "@/utils/web3";
import { Button, Image, ScrollShadow } from "@nextui-org/react";
import {
  useSwitchNetwork,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

import { useRouter } from "next/router";
import { formatEther } from "viem";

const TokenId = () => {
  const router = useRouter();
  const { collectionId, itemId } = router.query;
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { walletProvider } = useWeb3ModalProvider();

  const { open } = useWeb3Modal();

  const [marketItem, setMarketItem] = useState<any>();

  const [waitModalOpen, setWaitModalOpen] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

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

  const handleSuccessModalOpen = () => {
    setSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };

  const [characterInfo, setCharacterInfo] = useState<any>();

  useEffect(() => {
    const fetchMarketItemInfo = async () => {
      try {
        if (collectionId && itemId) {
          const _marketItemInfo = await getItem(collectionId[0], itemId[0]);
          setMarketItem(_marketItemInfo.marketItem);
        }
      } catch (error) {
        setMarketItem(null);
      }
    };
    fetchMarketItemInfo();
  }, [itemId]);

  const fetchItemDetails = async (marketItem: any) => {
    const characters: any = await getChar(marketItem.tokenId.toString());

    const variable = getTokenWearables(marketItem.tokenId.toString());
    let characterInfo = {
      variable: variable,
      character: characters,
    };

    setCharacterInfo(characterInfo);
  };

  useEffect(() => {
    if (!marketItem) {
      return;
    }
    fetchItemDetails(marketItem);
  }, [marketItem]);

  const handleBuy = async () => {
    if (isConnected !== true) {
      open();
      return;
    } else if (chainId !== CHILIZ.chainId) {
      switchNetwork(CHILIZ.chainId);
      return;
    }
    if (marketItem.seller === address) {
      return;
    }
    try {
      handleWaitModalOpen();

      const contract = GetContractAt(MAGGO_DIAMOND_CONTRACT);
      const signer = await GetSigner(walletProvider);

      const param = {
        collectionId: BigInt(marketItem.collectionId),
        itemId: BigInt(marketItem.itemId),
        tokenId: BigInt(marketItem.tokenId),
        amount: 1,
      };

      const tx = await contract
        .connect(signer)
        //@ts-ignore
        .buy([param], BigInt(marketItem.price_per_token), {
          value: BigInt(marketItem.price_per_token),
        });

      await tx.wait();
      handleWaitModalClose();
      handleSuccessModalOpen();
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  const handleCancel = async () => {
    try {
      handleWaitModalOpen();
      if (isConnected !== true) {
        open();
        return;
      } else if (chainId !== CHILIZ.chainId) {
        switchNetwork(CHILIZ.chainId);
        return;
      }

      if (marketItem.seller !== address) {
        return;
      }

      const contract = GetContractAt(MAGGO_DIAMOND_CONTRACT);
      const signer = await GetSigner(walletProvider);

      let param = {
        collectionId: marketItem.collectionId.toString(),
        itemId: marketItem.itemId.toString(),
      };

      const tx = await contract
        .connect(signer)
        //@ts-ignore
        .cancel([param]);

      await tx.wait();
      handleWaitModalClose();
      router.push("/marketplace");
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  return (
    <>
      <Head>
        <title>Maggoo | {characterInfo && characterInfo.character.name}</title>
      </Head>
      <SuccessModal
        isOpen={successModalOpen}
        desc={"You have succesfully bought NFT!"}
      />
      <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
      <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />
      {marketItem && (
        <div className="w-full h-full flex flex-col  items-center  justify-center py-5 relative sm:px-5">
          <div className="w-3/4	sm:w-full bg-header-bg  flex flex-col z-20 flex border border-black rounded-xl ">
            <div className="w-full flex sm:w-full sm:flex-col sm:h-full sm:pb-32  ">
              <div className="xl:w-2/5 md:w-3/5 h-full box-gradient p-5 rounded-xl ">
                <div className="flex w-full justify-between pr-5 items-center">
                  <div className="badge-wrapper">
                    <div className="badge ">
                      <div>
                        <span>
                          {characterInfo &&
                            characterInfo.character.hashPower.toString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col min-h-[420px] items-center justify-center relative w-full h-full  bounce">
                  {characterInfo && (
                    <Maggoo
                      character={characterInfo.character}
                      isMarketItem={false}
                    />
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col ">
                  <div className="flex ">
                    <div className="w-[185px] h-[260px]">
                      {characterInfo && (
                        <Maggoo
                          character={characterInfo.character}
                          isMarketItem={false}
                        />
                      )}
                    </div>
                    <div className=" h-full flex flex-col items-start justify-center">
                      <p className="text-primary-300 text-xl">Name</p>
                      <p className="text-xl">
                        {characterInfo && characterInfo.character.name}
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex px-5 gap-2 ">
                      <p className=" text-primary-300 ">Owned By</p>
                      <p className=" text-c-primary ">
                        {marketItem.seller.slice(0, 5) +
                          ".." +
                          marketItem.seller.slice(36, 42)}
                      </p>
                    </div>
                    <div className="w-full flex px-5 gap-2 ">
                      <p className=" text-primary-300 ">Royaities Receiver</p>
                      <p className=" text-c-primary ">
                        {marketItem.royaltiesReceiver.slice(0, 5) +
                          ".." +
                          marketItem.royaltiesReceiver.slice(36, 42)}
                      </p>
                    </div>
                    <div className="w-full flex px-5 gap-2 ">
                      <p className=" text-primary-300 ">Royaities Fee</p>
                      <p className=" text-c-primary ">
                        {formatEther(marketItem.royaltiesFee)} CHZ
                      </p>
                    </div>
                  </div>
                </div>
                <ScrollShadow hideScrollBar className="w-full h-[300px]">
                  <div className="w-full p-5 pb-8 mb-8">
                    <div>
                      <p>Character Details</p>
                    </div>
                    <div className="w-full h-full flex flex-col">
                      <div className="w-full h-full flex justify-between py-2 border-b">
                        <p>Body</p>
                        <p className="text-[#44cc48]">
                          {characterInfo && characterInfo.variable.item === 0
                            ? `+${characterInfo.character.hashPower.toString()}HP`
                            : "-"}
                        </p>
                      </div>
                      <div className="w-full h-full flex justify-between py-2 border-b">
                        <p>Head</p>
                        <p className="text-[#44cc48]">
                          {characterInfo && characterInfo.variable.item === 2
                            ? `+${characterInfo.character.hashPower.toString()}HP`
                            : "-"}
                        </p>
                      </div>
                      <div className="w-full h-full flex justify-between py-2 border-b">
                        <p>Face</p>
                        <p className="text-[#44cc48]">
                          {characterInfo && characterInfo.variable.item === 6
                            ? `+${characterInfo.character.hashPower.toString()}HP`
                            : "-"}
                        </p>
                      </div>
                      <div className="w-full h-full flex justify-between py-2 border-b">
                        <p>Left Hand</p>
                        <p className="text-[#44cc48]">
                          {characterInfo && characterInfo.variable.item === 5
                            ? `+${characterInfo.character.hashPower.toString()}HP`
                            : "-"}
                        </p>
                      </div>
                      <div className="w-full h-full flex justify-between py-2 border-b">
                        <p>Right Hand</p>
                        <p className="text-[#44cc48]">
                          {characterInfo && characterInfo.variable.item === 4
                            ? `+${characterInfo.character.hashPower.toString()}HP`
                            : "-"}
                        </p>
                      </div>
                      <div className="w-full h-full flex justify-between py-2 border-b">
                        <p>Backpack</p>
                        <p className="text-[#44cc48]">
                          {characterInfo && characterInfo.variable.item === 3
                            ? `+${characterInfo.character.hashPower.toString()}HP`
                            : "-"}
                        </p>
                      </div>
                      <div className="w-full h-full flex justify-between py-2 ">
                        <p>Chest</p>
                        <p className="text-[#44cc48]">
                          {characterInfo && characterInfo.variable.item === 1
                            ? `+${characterInfo.character.hashPower.toString()}HP`
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollShadow>
              </div>
            </div>

            <div className="w-full  sm:px-2 bottom-0 h-32 w-full bg-header-bg z-50 flex items-center justify-center">
              <div className="w-full  items-center justify-center flex gap-10">
                <div className="flex gap-4 items-center">
                  <Image src="/logo/chz.svg" alt="xd" width={80} />
                  <div className="flex flex-col">
                    <p className="text-primary-300 sm:text-xl xl:text-2xl">
                      {Number(
                        formatEther(
                          BigInt(marketItem.price_per_token.toString())
                        )
                      ).toFixed(2)}{" "}
                      CHZ
                    </p>
                  </div>
                </div>
                <div className="h-full">
                  <Button
                    onClick={() =>
                      address === marketItem?.seller
                        ? handleCancel()
                        : handleBuy()
                    }
                    className="btn btn-primary xl:w-40 sm:w-32 text-xl h-16"
                  >
                    {address === marketItem?.seller ? "CANCEL" : "BUY NOW !"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenId;
