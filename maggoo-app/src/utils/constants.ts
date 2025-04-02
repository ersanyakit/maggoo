import { createPublicClient, http } from "viem";
import { CHILIZ, SONIC } from "./chains";
import { chiliz, sonic } from "viem/chains";
import { IContract, NetworkClient } from "@/types";

import MaggoDiamondAbi from "../contracts/abi/MaggooDiamond.json";
import MaggoNFTAbi from "../contracts/abi/MaggooNFT.json";

import { CONTRACT_ADRESSES } from "@/contracts/addresses";
import { getWearableSlot } from "./support";

export const MORALIS_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImExNGNmMjA0LTk3MjktNGE4NC05YmY1LWU3NDg3OGVlN2NmMyIsIm9yZ0lkIjoiMzE4NTc1IiwidXNlcklkIjoiMzI3NTI0IiwidHlwZUlkIjoiNWU2ZWQ4YWMtZDQzNC00ZDg5LTg4ZmMtZmNiYjI0MTlmMjc3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODQ0OTkzOTUsImV4cCI6NDg0MDI1OTM5NX0.40JzlXVo9cIu5_FZhXCoG_E0QJt5Yjg36h6JUXMyukY";

export const metadata = {
  name: "Maggoo APP",
  description: "Maggoo Land is a community driven decentralized P2E gaming platform with upgradable NFT cult characters called Maggoo.",
  url: "http://app.maggoo.io",
  icons: ["/logo/logo-symbol.png"],
};

export const chilizClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: chiliz,
  transport: http(CHILIZ.rpcUrl),
});


export const sonicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  cacheTime: 10_000,
  pollingInterval: 10_000,
  chain: sonic,
  transport: http(SONIC.rpcUrl),
});


export const NETWORKS: Record<string, NetworkClient> = {
  chiliz: { client: chilizClient, network: CHILIZ },
  hardhat: { client: sonicClient, network: SONIC },
}

export function getNetworkClient(chainId: number): NetworkClient {

  console.log("getNetworkClient: currentChainId", chainId)
  const network = Object.values(NETWORKS).find((net) => net.network.chainId && net.network.chainId === chainId);
  if (!network) {
      throw new Error(`Network with chainId ${chainId} not found`);
  }
  return network;
}

export const MAGGO_DIAMOND_CONTRACT: IContract = {
  address: CONTRACT_ADRESSES.MAGGOODIAMOND,
  abi: MaggoDiamondAbi.abi,
  chainId: CHILIZ.chainId,
  rpcUrl: "https://rpc.chiliz.com",
};

export const MAGGO_NFT_CONTRACT: IContract = {
  address: CONTRACT_ADRESSES.MAGGOONFT,
  abi: MaggoNFTAbi.abi,
  chainId: CHILIZ.chainId,
  rpcUrl: "https://rpc.chiliz.com",
};

export function getTokenWearables(tokenId: any) {
  let character: any = 0;
  let item = 0;
  let slot = "";
  let name = "";
  try {
    if (!tokenId) {
      return { character: character, item: item, slot: slot, name: name };
    }

    const isBase: boolean = BigInt(tokenId) >= BODY_TOKEN_ID_START;
    character = Number(
      tokenId / (isBase ? BODY_TOKEN_ID_START : WEARABLE_TOKEN_ID_START)
    ).toFixed(0);
    item = isBase ? 0 : tokenId % WEARABLE_TOKEN_ID_START;

    const result = getWearableSlot(Number(character).toFixed(0), item);
    slot = result.image;
    name = result.name;

    return { character: character, item: item, slot: slot, name: name };
  } catch (error) {
    return { character: character, item: item, slot: slot, name: name };
  }
}

export const BODY_TOKEN_ID_START = 1000000000000;
export const WEARABLE_TOKEN_ID_START = 1000;

export enum WearableSlot {
  Body, // 0
  ChestArmor, // 1
  Headgear, // 2
  Backpack, // 3
  RightHand, // 4
  LeftHand, // 5
  Face, // 6
  Worm, // 7
}
