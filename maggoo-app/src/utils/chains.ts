import { chiliz } from "viem/chains";

export const CHILIZ = {
  chainId: chiliz.id,
  name: chiliz.name,
  currency: chiliz.nativeCurrency.symbol,
  explorerUrl: "https://chiliscan.com/",
  rpcUrl: "https://rpc.chiliz.com",
  image: "/logo/chiliz.svg",
};

export const ALL_CHAINS = [CHILIZ];
