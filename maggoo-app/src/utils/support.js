import { ALL_CHAINS } from "@/utils/chains";
import { stringToBytes } from "viem";
import { Contract, JsonRpcProvider, BrowserProvider } from "ethers";
import { MAGGOO_ITEMS } from "./NFTNames";

export const HexToInteger = (hexValue) => parseInt(hexValue, 10);

export function FormatAddressDesign(address, startChars = 6, endChars = 6) {
  if (address.length <= startChars + endChars) {
    return address;
  }

  const visiblePart =
    address.substring(0, startChars) +
    "..." +
    address.substring(address.length - endChars);
  return visiblePart;
}

export function CheckChain(chainId) {
  for (const chain of ALL_CHAINS) {
    if (chain.chainId === chainId) {
      return true;
    }
  }
  return false;
}

export function NumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function ConvertIpfsUrl(ipfsURL) {
  const ipfsPrefix = "ipfs://";
  if (stringToBytes(ipfsURL).length > 20) {
    if (ipfsURL && ipfsURL.startsWith(ipfsPrefix)) {
      const convertedUrl = `https://ipfs.infura.io/ipfs/${
        ipfsURL.split("://")[1]
      }`;
      return convertedUrl;
    } else {
      const convertedUrl = `https://ipfs.infura.io/ipfs/${ipfsURL}`;
      return convertedUrl;
    }
  } else {
    return ipfsURL;
  }
}

export async function GetSigner(wallet) {
  return new BrowserProvider(wallet).getSigner();
}

export function GetContractAt(contract) {
  return new Contract(
    contract.address,
    contract.abi,
    new JsonRpcProvider(contract.rpcUrl)
  );
}

export function getWearableSlot(tokenId, itemId) {
  switch (itemId) {
    case 0:
      return {
        image: `/assets/${tokenId}/Body_${tokenId}.png`,
        name: MAGGOO_ITEMS[tokenId],
        type: "BODY"
      };
    case 1:
      return {
        image: `/assets/${tokenId}/Chest_${tokenId}.png`,
        name: MAGGOO_ITEMS[tokenId] + " > Chest"
      };
    case 2:
      return {
        image: `/assets/${tokenId}/Head_${tokenId}.png`,
        name: MAGGOO_ITEMS[tokenId] + " > Head"
      };
    case 3:
      return {
        image: `/assets/${tokenId}/Backpack_${tokenId}.png`,
        name: MAGGOO_ITEMS[tokenId] + " > Backpack"
      };
    case 4:
      return {
        image: `/assets/${tokenId}/R_Hand_${tokenId}.png`,
        name: MAGGOO_ITEMS[tokenId] + " > Right Hand"
      };
    case 5:
      return {
        image: `/assets/${tokenId}/L_Hand_${tokenId}.png`,
        name: MAGGOO_ITEMS[tokenId] + " > Left Hand"
      };
    case 6:
      return {
        image: `/assets/${tokenId}/Face_${tokenId}.png`,
        name: MAGGOO_ITEMS[tokenId] + " > Face"
      };
    default:
      return {
        image: `/assets/${tokenId}/Worm_${tokenId}.png`,
        name: MAGGOO_ITEMS[tokenId + 1]
      };
  }
}
