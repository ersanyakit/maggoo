import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "@nextui-org/react";

import Image from "next/image";
import { SELL_PARAM } from "@/types";
import { CONTRACT_ADRESSES } from "@/contracts/addresses";
import {
  useSwitchNetwork,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from "@web3modal/ethers/react";
import { GetContractAt, GetSigner, selectedClient } from "@/utils/web3";
import axios from "axios";
import { CHILIZ } from "@/utils/chains";

import { getContract, parseEther } from "viem";
import { MAGGO_DIAMOND_CONTRACT, MAGGO_NFT_CONTRACT } from "@/utils/constants";
import SuccessModal from "../modal/SuccessModal";
import WaitModal from "../modal/WaitModal";
import ErrorModal from "../modal/ErrorModal";
import Maggoo from "../maggoo";

export interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedToken: string;
  character: any;
}

const SellModal: React.FC<SellModalProps> = ({
  isOpen,
  onClose,
  selectedToken,
  character
}) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();
  const { switchNetwork } = useSwitchNetwork();
  const [scsModalOpen, setScsModalOpen] = useState(false);
  const [waitModalOpen, setWaitModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  console.log(selectedToken);

  const [sellParam, setSellParam] = useState<SELL_PARAM>({
    assetType: 3,
    contractAddress: CONTRACT_ADRESSES.MAGGOONFT,
    tokenId: "",
    amount: 1,
    price: ""
  });

  const [metadata, setMetadata] = useState<any>();

  const handlescsModalOpen = () => {
    setScsModalOpen(true);
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

  const handleInputChanges = (
    event: React.ChangeEvent<HTMLInputElement>,
    formName: string
  ) => {
    let newValue = event.target.value.toString();

    if (formName === "price") {
      if (/[^0-9]/.test(newValue)) {
        return;
      }
      if (newValue === "" || newValue.startsWith("0")) {
        setSellParam((prevFormData) => ({
          ...prevFormData,
          [formName]: ""
        }));
        return;
      }
    }

    setSellParam((prevFormData) => ({
      ...prevFormData,
      [formName]: newValue
    }));
  };

  const setApprove = async () => {
    if (isConnected !== true) {
      open();
    }
    if (chainId !== CHILIZ.chainId) {
      switchNetwork(CHILIZ.chainId);
    }

    try {
      const nftContract = getContract({
        address: MAGGO_NFT_CONTRACT.address,
        abi: MAGGO_NFT_CONTRACT.abi,
        client: selectedClient
      });

      const isApproved = await nftContract.read.isApprovedForAll([
        address,
        MAGGO_DIAMOND_CONTRACT.address
      ]);

      if (isApproved !== true) {
        const signer = await GetSigner(walletProvider);
        const contract = GetContractAt(MAGGO_NFT_CONTRACT);

        const tx = await contract
          .connect(signer)
          // @ts-ignore
          .setApprovalForAll(MAGGO_DIAMOND_CONTRACT.address, true);
        await tx.wait();
      } else {
        return "approved";
      }
    } catch (error) {}
  };

  const handleSell = async () => {
    if (isConnected !== true) {
      open();
    }

    if (chainId !== CHILIZ.chainId) {
      switchNetwork(CHILIZ.chainId);
    }
    try {
      handleWaitModalOpen();
      await setApprove();

      const signer = await GetSigner(walletProvider);
      const contract = GetContractAt(MAGGO_DIAMOND_CONTRACT);

      let param = {
        assetType: 3,
        contractAddress: CONTRACT_ADRESSES.MAGGOONFT,
        tokenId: selectedToken,
        amount: 1,
        price: parseEther(sellParam.price)
      };
      const tx = await contract
        .connect(signer)
        // @ts-ignore
        .sell([param]);

      await tx.wait();
      handleWaitModalClose();

      handlescsModalOpen();
    } catch (error) {
      handleWaitModalClose();
      handleErrorModalOpen();
    }
  };

  const updateSellParams = () => {
    setSellParam((prevFormData) => ({
      ...prevFormData,
      tokenId: selectedToken
    }));
  };

  useEffect(() => {
    if (Number(selectedToken.toString()) > 0) {
      updateSellParams();
    }
  }, [selectedToken]);

  return (
    <>
      <WaitModal isOpen={waitModalOpen} onClose={handleWaitModalClose} />
      <ErrorModal isOpen={errorModalOpen} onClose={handleErrorModalClose} />
      <SuccessModal
        isOpen={scsModalOpen}
        desc="You have successfully listed your NFT!"
      />
      <Modal
        hideCloseButton={true}
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          body: "py-6",
          backdrop: "blur",
          base: "bg-primary-300 border border-primary-100",
          header: "border-b-[1px] border-primary-100",
          footer: "border-t-[1px] border-primary-100"
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex items-center justify-start h-full sm:text-center ">
                <div className="flex flex-col items-center justify-center relative w-full h-[350px]  bg-transparent">
                  <p className="text-2xl">{character.name}</p>
                  <Maggoo character={character} isMarketItem={false} />
                </div>
              </ModalBody>
              <ModalFooter className="flex flex-col gap-5 w-full">
                <Input
                  placeholder="0.00 CHZ"
                  onChange={(e) => handleInputChanges(e, "price")}
                  value={sellParam.price}
                  radius="sm"
                  className="text-lg w-full  text-white"
                />
                <Button
                  disabled={sellParam.price === ""}
                  onClick={() => handleSell()}
                  radius="sm"
                  className="w-full btn text-xl">
                  Sell
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default SellModal;
