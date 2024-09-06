import React, { useEffect, useState } from "react";
import { Button, Slider, SliderValue } from "@nextui-org/react";
import {
  useSwitchNetwork,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

import Head from "next/head";

import { GetContractAt, GetSigner } from "@/utils/support";
import { formatEther } from "viem";
import { MAGGO_DIAMOND_CONTRACT } from "@/utils/constants";

import { getCollections } from "@/utils/web3";
import NFTCard from "@/components/marketplace/nftCard";
import { CHILIZ } from "@/utils/chains";
import SuccessModal from "@/components/modal/SuccessModal";
import WaitModal from "@/components/modal/WaitModal";
import ErrorModal from "@/components/modal/ErrorModal";
import classNames from "classnames";

const Marketplace = () => {
  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const [collections, setCollections] = useState<any>();
  const [avalilableCollections, setAvailableCollections] = useState<any>();
  const [totalItemCount, setTotalItemCount] = useState<number>(0);

  useEffect(() => {
    const collectionsGetter = async () => {
      try {
        const collectionsInf: any = await getCollections();
        const avaliableCollections = collectionsInf.filter(
          (item: any) =>
            item.is_cancelled === false && item.is_completed === false
        );

        const availableCounter = await collectionsInf.filter(
          (item: any) =>
            item.is_cancelled === false &&
            item.is_completed === false &&
            item.seller !== address
        );
        try {
          const totalItemCounter = await availableCounter.reduce(
            (accumulator: number, item: any) =>
              accumulator + Number(BigInt(item.remaining_amount).toString()),
            0
          );

          setTotalItemCount(totalItemCounter);
        } catch (error) {}
        setCollections(avaliableCollections);
        setAvailableCollections(availableCounter);
      } catch (error) {}
    };
    collectionsGetter();
  }, [address, chainId, isConnected]);

  const [value, setValue] = useState<SliderValue>(0);
  const [selectedCollectionsParam, setSelectedCollectionsParam] = useState<
    any[]
  >([]);
  const [previousValue, setPreviousValue] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);

  useEffect(() => {
    if (Number(value) === 0) {
      setSelectedCollectionsParam([]);
      setTotalPrice(0);
      setPreviousValue(0);
      setItemCount(0); // itemCount'u sıfırla
    } else if (avalilableCollections && avalilableCollections.length > 0) {
      const newSelectedCollections: any[] = [];
      let newTotalPrice: number = 0;
      let newItemCount: number = 0;

      if (Number(value) > previousValue) {
        // Slider değeri arttığında
        for (let i = previousValue; i < Number(value); i++) {
          const selectedCollection = avalilableCollections[i];

          // Kullanıcının kendi itemini seçmemesi için kontrol
          if (selectedCollection.seller === address) {
            continue;
          }

          const selectedCollectionData = {
            collectionId: Number(selectedCollection.collectionId.toString()),
            itemId: Number(selectedCollection.itemId.toString()),
            tokenId: Number(selectedCollection.tokenId.toString()),
            amount: Number(BigInt(selectedCollection.amount).toString()),
          };

          newSelectedCollections.push(selectedCollectionData);
          newTotalPrice += Number(
            BigInt(selectedCollection.price_per_token).toString()
          );
          newItemCount += Number(
            BigInt(selectedCollection.remaining_amount).toString()
          );
        }

        setSelectedCollectionsParam((prevSelected) => [
          ...prevSelected,
          ...newSelectedCollections,
        ]);
        setTotalPrice((prevTotal: number) => prevTotal + newTotalPrice);
        setItemCount((prevCount: number) => prevCount + newItemCount);
      } else if (Number(value) < previousValue) {
        // Slider değeri azaldığında
        for (let i = Number(value); i < previousValue; i++) {
          const selectedCollection = avalilableCollections[i];

          // Kullanıcının kendi itemini seçmemesi için kontrol
          if (selectedCollection.seller === address) {
            continue;
          }

          newTotalPrice += Number(
            BigInt(selectedCollection.price_per_token).toString()
          );
          newItemCount += Number(
            BigInt(selectedCollection.remaining_amount).toString()
          );
        }

        setSelectedCollectionsParam((prevSelected) =>
          prevSelected.slice(0, Number(value))
        );
        setTotalPrice((prevTotal: number) => prevTotal - newTotalPrice);
        setItemCount((prevCount: number) => prevCount - newItemCount);
      }

      setPreviousValue(Number(value));
    }
  }, [
    value,
    collections,
    avalilableCollections,
    address,
    chainId,
    isConnected,
  ]);

  const { switchNetwork } = useSwitchNetwork();

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

  const handleBuy = async () => {
    try {
      if (!selectedCollectionsParam || selectedCollectionsParam.length === 0) {
        return;
      }
      if (isConnected !== true) {
        open();
      } else if (chainId !== CHILIZ.chainId) {
        switchNetwork(CHILIZ.chainId);
      }

      handleWaitModalOpen();

      const contract = GetContractAt(MAGGO_DIAMOND_CONTRACT);
      const signer = await GetSigner(walletProvider);

      const tx = await contract
        .connect(signer)
        //@ts-ignore
        .buy(selectedCollectionsParam, BigInt(totalPrice).toString(), {
          value: BigInt(totalPrice).toString(),
        });

      await tx.wait();
      handleWaitModalClose();
      handleSuccessModalOpen();
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={successModalOpen}
        desc={"You have succesfully bought NFTs!"}
      />
      <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
      <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />
      <Head>
        <title>Maggoo | Marketplace</title>
      </Head>
      <div className="flex flex-col gap-10 h-full justify-center  w-full ">
        <div className="flex sm:flex-col md:flex-col gap-2 xl:flex-row  py-3 items-center justify-between w-full lg:px-[10%] md:px-[5%] sm:px-[5%] backdrop-blur-xl fixed top-[96px] z-[40]">
          <div className="sm:w-full md:w-full xl:w-1/2 flex items-center xl:justify-start sm:justify-between md:justify-between gap-5">
            <>
              {collections && avalilableCollections && totalItemCount && (
                <>
                  <div className="w-full">
                    <Slider
                      size="lg"
                      step={1}
                      color="foreground"
                      label={
                        <>
                          <p className="text-2xl">Sweep</p>
                        </>
                      }
                      classNames={{
                        filler:
                          "bg-gradient-to-r from-primary-300 to-primary-100",
                        trackWrapper:
                          "border-primary-100 border rounded-full p-0 h-[30px]",
                        track: "bg-primary-300",
                        thumb: [
                          "transition-size",
                          "bg-gradient-to-r from-primary-300 to-orange-700",
                          "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                          "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                        ],
                      }}
                      value={itemCount}
                      onChange={setValue}
                      showSteps={true}
                      maxValue={25}
                      minValue={0}
                      defaultValue={0}
                      className="w-full text-2xl"
                    />
                  </div>
                </>
              )}
            </>
            <Button
              onClick={() => handleBuy()}
              radius="sm"
              size="lg"
              className="btn btn-primary h-14"
            >
              Buy Now
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <p>Total Price:</p>
            <span>
              {Number(formatEther(BigInt(totalPrice))).toFixed(2)} CHZ
            </span>
          </div>
        </div>
        <div className="h-[100px]"></div>
        <div className="z-0 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5 sm:gap-10 w-full xl:px-[10%] lg:px-[10%] md:px-[5%] sm:px-[5%]">
          {collections &&
            collections.map((collectionItem: any, index: number) => (
              <div
                key={"nft_cards_card_keys_key_" + index.toString()}
                className={classNames(
                  selectedCollectionsParam.some(
                    (item: any) =>
                      Number(item?.tokenId) === Number(collectionItem.tokenId)
                  )
                    ? "scale-[95%] animate-pulse"
                    : ""
                )}
              >
                <NFTCard
                  key={"nft_cards_keys_key_" + index.toString()}
                  collection={collectionItem}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Marketplace;
