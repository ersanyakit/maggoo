import React, { useEffect, useState } from "react";

import { GetSigner } from "@/utils/support";
import { Button, Image, Tab, Tabs } from "@nextui-org/react";
import Head from "next/head";

import {
  useSwitchNetwork,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider
} from "@web3modal/ethers/react";

import {
  BODY_TOKEN_ID_START,
  getTokenWearables,
  MAGGO_DIAMOND_CONTRACT,
  MAGGO_NFT_CONTRACT
} from "@/utils/constants";
import useMoralisGetNFTs from "@/hooks/useMoralisGetNFTs";
import { CHILIZ } from "@/utils/chains";
import {
  getChar,
  getCollections,
  GetContractAt,
  selectedClient
} from "@/utils/web3";
import { formatEther, getContract, parseEther } from "viem";

import SellModal from "@/components/profile/SellModal";
import NFTCard from "@/components/marketplace/nftCard";
import ProfileNFTCard from "@/components/profile/ProfileNftCard";
import UserListedCard from "@/components/profile/UserListedCard";

const Profile = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const [userListedNFTs, setUserListedNFTs] = useState<any>();

  const [errorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const [collections, setCollections] = useState<any>();
  const [avalilableCollections, setAvailableCollections] = useState<any>();
  const [totalItemCount, setTotalItemCount] = useState<number>(0);

  const [selectedTokenId, setSelectedTokenId] = useState<string>("");

  const { switchNetwork } = useSwitchNetwork();

  const { isLoading, nfts } = useMoralisGetNFTs(address);

  useEffect(() => {
    const collectionsGetter = async () => {
      try {
        const collectionsInf: any = await getCollections();
        const avaliableCollections = collectionsInf.filter(
          (item: any) =>
            item.is_cancelled === false &&
            item.is_completed === false &&
            item.seller === address
        );

        setUserListedNFTs(avaliableCollections);
      } catch (error) {
        console.log(error);
      }
    };
    collectionsGetter();
  }, [address, chainId, isConnected]);


  const getPrice = (tokenId : any) => {
    const min = parseInt(tokenId) < BODY_TOKEN_ID_START ? 115 : 260
    const max = parseInt(tokenId) < BODY_TOKEN_ID_START ? 150 : 280
    const randomNum = Math.random() * (max - min) + min;
    return  parseEther(randomNum.toFixed(2));
  }
  const handleBulkSell = async () =>{

    const sellParams : any = []
    nfts.result.map((item: any, index: number) => {


        let sellParam = {
                    assetType:3,
                    contractAddress:item.token_address,
                    tokenId:item.token_id,
                    amount:1,
                    price:getPrice(item.token_id)
                }
                sellParams.push(sellParam)
          })

          const signer = await GetSigner(walletProvider);
          const contract = GetContractAt(MAGGO_DIAMOND_CONTRACT);
          const tx = await contract
          .connect(signer)
          // @ts-ignore
          .sell(sellParams);
          await tx.wait();

}

  return (
    <>
      <Head>
        <title>Maggoo | Profile</title>
      </Head>

      <div className="w-full h-full flex justify-center p-5 flex-col">
        <div className="w-full flex flex-col items-center gap-5">
          <p className="text-5xl uppercase">Profile</p>
          <p className="text-c-primary uppercase">
            YOU CAN FIND ALL OF YOUR ASSETS
          </p>
        </div>

        <Tabs
          size="lg"
          className="w-full h-full flex justify-center py-5"
          aria-label="Options">
          <Tab className="text-xl w-full" key="ALL" title="Available NFTs">
            <div className="w-full grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 sm:gap-10  gap-5">
              {nfts &&
                isLoading === false &&
                nfts.result.map((item: any, index: number) => (
                  <div key={index + 1} className="col-span-1">
                    <ProfileNFTCard collection={item.token_id} />
                  </div>
                ))}
            </div>

            <div className="w-full flex flex-col gap-2 items-center justify-center">
            <Button size="lg" onClick={()=>{
              handleBulkSell()
            }}>Sell All NFTs</Button>
            </div>

          </Tab>

          <Tab key="on_list" title="On List">
            <div className="w-full grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 sm:gap-10  gap-5">
              {userListedNFTs &&
                isLoading === false &&
                userListedNFTs.map((item: any, index: number) => (
                  <div key={index + 1} className="col-span-1">
                    <UserListedCard collection={item} />
                  </div>
                ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
