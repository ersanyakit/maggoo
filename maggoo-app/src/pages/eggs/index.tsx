import React, { useEffect, useRef, useState } from "react";
import { Button, Slider } from "@nextui-org/react";
import OpenBoxModal from "@/components/eggs/OpenBoxModal";
import OpenEggModal from "@/components/eggs/OpenEggModal";
import Image from "next/image";
import useIntersectionObserver from "@/hooks/useIntersection";
import Head from "next/head";
import { parseEther } from "ethers";
import { MAGGO_DIAMOND_CONTRACT } from "@/utils/constants";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getMintHistory, GetContractAt, GetSigner } from "@/utils/web3";
import WaitModal from "@/components/modal/WaitModal";
import ErrorModal from "@/components/modal/ErrorModal";
import { formatEther } from "viem";

// loremmmmmmmmmmmmmmm

const Eggs = () => {
  const [txCounter, setTxCounter] = useState<number>(0);

  const [openMysteryModal, setOpenMysteryModal] = useState<boolean>(false);
  const [openEggModal, setOpenEggModal] = useState<boolean>(false);

  const [waitModalOpen, setWaitModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const [maggooEggFee, setMaggooEggFee] = useState<any>(parseEther("250"));
  const [mysteriousBoxFee, setMysteriousBoxFee] = useState<any>(
    parseEther("100")
  );

  const [maggooEggAmount, setMaggooEggAmount] = useState<number>(1);
  const [boxAmount, setBoxAmount] = useState<number>(1);

  const threeRef = useRef<HTMLDivElement>(null);
  const threeRef1 = useRef<HTMLDivElement>(null);

  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  useIntersectionObserver(threeRef);
  useIntersectionObserver(threeRef1);

  const handleOpenBoxModal = () => {
    setOpenMysteryModal(true);
  };

  const handleCloseBoxModal = () => {
    setOpenMysteryModal(false);
  };

  const handleOpenEggModal = () => {
    setOpenEggModal(true);
  };

  const handleCloseEggModal = () => {
    setOpenEggModal(false);
  };

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

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const mintEgg = async () => {
    try {
      handleWaitModalOpen();
      let params = await getRandomMintParams(true, maggooEggAmount);

      const signer = await GetSigner(walletProvider);
      const contract = GetContractAt(MAGGO_DIAMOND_CONTRACT);

      let depositOverrides = {
        value: maggooEggFee * BigInt(params.length),
      };

      const tx = await contract
        .connect(signer)
        // @ts-ignore
        .create(params, depositOverrides);

      await tx.wait();

      setTxCounter(txCounter + 1);

      handleWaitModalClose();

      handleOpenEggModal();
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  const mintMysteryBox = async () => {
    try {
      handleWaitModalOpen();

      let params = await getRandomMintParams(false, boxAmount);

      const signer = await GetSigner(walletProvider);
      const contract = GetContractAt(MAGGO_DIAMOND_CONTRACT);

      let depositOverrides = {
        value: mysteriousBoxFee * BigInt(params.length),
      };

      const tx = await contract
        .connect(signer)
        // @ts-ignore
        .create(params, depositOverrides);
      await tx.wait();

      setTxCounter(txCounter + 1);
      handleWaitModalClose();

      handleOpenBoxModal();
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  const getRandomMintParams = async (base: any, limit: any) => {
    const getMintParams = (
      base: any,
      maggooId: any,
      tokenIndex: any,
      subIndex: any = ""
    ) => {
      const BODY_TOKEN_ID_START = 1000000000000;
      const WEARABLE_TOKEN_ID_START = 1000;

      return {
        isBase: base,
        entryPoint:
          (base
            ? getRandomNumber(1, BODY_TOKEN_ID_START)
            : getRandomNumber(1, WEARABLE_TOKEN_ID_START)) +
          Math.floor(Math.random() * 10000000) +
          1,
      };
    };

    let createParams = [];
    for (let i = 1; i <= limit; i++) {
      const characterIndex = getRandomNumber(1, 62);
      const getItemCount = (index: any) => {
        return 1000 - (index - 1) * 10;
      };
      if (base) {
        const item = getRandomNumber(1, getItemCount(characterIndex));
        createParams.push(getMintParams(true, characterIndex, item, ""));
      } else {
        const item = getRandomNumber(1, getItemCount(characterIndex));
        createParams.push(getMintParams(false, characterIndex, item, ""));
      }
    }

    return createParams;
  };

  return (
    <>
      <Head>
        <title>Maggoo | Eggs & Boxes</title>
      </Head>
      <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
      <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />

      <OpenBoxModal
        isOpen={openMysteryModal}
        desc={""}
        address={address}
        onClose={handleCloseBoxModal}
      />
      <OpenEggModal
        isOpen={openEggModal}
        desc={""}
        address={address}
        onClose={handleCloseEggModal}
      />
      <div className="w-full h-full flex flex-col gap-5 py-5 ">
        <div className="w-full flex flex-col items-center gap-5">
          <p className="text-5xl uppercase">MAGGOO SHOP</p>
          <p className="text-c-primary">THE MORE HASH POWER, THE MORE MAG!</p>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <div className="xl:w-3/5 md:w-4/5 sm:w-full sm:flex-col sm:px-5 flex justify-center gap-10">
            <div
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}
              ref={threeRef}
              className="w-full h-[560px] flex-col bg-[#0e1e32] border-2 border-black flex justify-center items-center rounded-xl"
            >
              <div className="w-full  flex h-full items-center flex-col gap-5 ">
                <Image
                  src="/eggs/Egg_V01.png"
                  alt="egg"
                  width={280}
                  height={260}
                  className="bg-transparent"
                />
                <p className="uppercase text-3xl">MAGGOO EGG</p>
                <div className="w-full px-5 flex flex-col gap-5">
                  <Slider
                    onChange={(e: number | any) => setMaggooEggAmount(e)}
                    size="lg"
                    step={1}
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
                    label="Amount"
                    showSteps={true}
                    maxValue={10}
                    minValue={1}
                    defaultValue={1}
                  />
                  <Button
                    onClick={() => {
                      mintEgg();
                    }}
                    className=" btn-primary w-full py-8 text-2xl"
                  >
                    <p>
                      {formatEther(maggooEggFee * BigInt(maggooEggAmount))} CHZ
                    </p>
                  </Button>
                </div>

                <p className="text-c-primary text-sm sm:text-center  sm:text-xs">
                  Maggoo Egg contains various Maggoos with certain hash powers
                </p>
              </div>
            </div>
            <div
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}
              ref={threeRef1}
              className="w-full h-[560px] flex-col bg-[#0e1e32] border-2 border-black flex justify-center items-center rounded-xl"
            >
              <div className="w-full  flex h-full items-center flex-col gap-5 ">
                <Image
                  src="/boxes/Box_V01.png"
                  alt="egg"
                  width={260}
                  height={260}
                  className="bg-transparent"
                />
                <p className="uppercase text-3xl">MYSTERY BOX</p>
                <div className="w-full px-5 flex flex-col gap-5">
                  <Slider
                    onChange={(e: number | any) => setBoxAmount(e)}
                    size="lg"
                    step={1}
                    classNames={{
                      filler:
                        "bg-gradient-to-r from-primary-300 to-primary-100",
                      trackWrapper:
                        "border-primary-100 border rounded-full p-0 h-[30px]",
                      track: "bg-primary-300",
                      thumb: [
                        "transition-size",
                        "bg-gradient-to-r from-primary-300 to-orange-700 ",
                        "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                        "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                      ],
                    }}
                    label="Amount"
                    showSteps={true}
                    maxValue={10}
                    minValue={1}
                    defaultValue={1}
                  />
                  <Button
                    onClick={() => mintMysteryBox()}
                    className=" btn-primary  w-full py-8 text-2xl"
                  >
                    <p>
                      {formatEther(mysteriousBoxFee * BigInt(boxAmount))} CHZ
                    </p>
                  </Button>
                </div>
                <p className="text-c-primary text-sm sm:text-center sm:text-xs ">
                  Mystery Box contains various items with certain hash powers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Eggs;
