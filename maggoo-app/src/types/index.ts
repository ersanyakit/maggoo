import { parseEther } from "viem";

export interface IContract {
  address: `0x${string}` | any;
  abi: object[];
  chainId: number;
  rpcUrl: string;
}

export interface CONTRACTADDRESS {
  MAGGOODIAMOND: `0x${string}` | string;
  MAGGOONFT: `0x${string}` | string;
  KEWL: `0x${string}` | string;
  WCHZ: `0x${string}` | string;
  FAN_TOKENS: any[] | string[];
}

enum WearableSlot {
  Body = 0,
  ChestArmor = 1, // Gövde zırhı veya kıyafeti için
  Headgear = 2, // Başlık veya kask gibi baş aksesuarı için
  Backpack = 3, // Sırt çantası için
  RightHand = 4, // Sağ el aksesuarı için
  LeftHand = 5, // Sol el aksesuarı için
  Face = 6 // Yüz aksesuarı için
}

enum TAssetType {
  // 0: ETH on mainnet, MATIC on polygon, etc.
  NATIVE,
  // 1: ERC20 items (ERC777 and ERC20 analogues could also technically work)
  ERC20,
  // 2: ERC721 items
  ERC721,
  // 3: ERC1155 items
  ERC1155
}
const sellItemPrice = parseEther("0.000000000000000001");

export interface SELL_PARAM {
  assetType: TAssetType;
  contractAddress: `0x${string}` | string;
  tokenId: string;
  amount: number;
  price: string;
}

let user1SellParams = [
  {
    assetType: 3,
    contractAddress: "0x3aC8aC8EC9B43CFFa7fABcF1dF6ea9F9E816C60c",
    tokenId: 0,
    amount: 1,
    price: sellItemPrice
  }
];
