import { chiliz,sonic } from "viem/chains";


export const CHILIZ = {
  chainId: chiliz.id,
  name: chiliz.name,
  currency: chiliz.nativeCurrency.symbol,
  explorerUrl: "https://chiliscan.com/",
  rpcUrl: "https://rpc.chiliz.com",
  image: "/logo/chz.svg",
};

export const SONIC = {
  chainId: sonic.id,
  name: sonic.name,
  currency: sonic.nativeCurrency.symbol,
  explorerUrl: "https://sonicscan.com",
  rpcUrl: "https://rpc.soniclabs.com",
  image: "/logo/sonic.svg",
};

export const ALL_CHAINS = [SONIC,CHILIZ];
