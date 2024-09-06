import {
  BODY_TOKEN_ID_START,
  WEARABLE_TOKEN_ID_START,
  WearableSlot,
} from "./constants";

export const getImageName = (
  isBase: any,
  characterId: any,
  wearableId: any
) => {
  if (isBase) {
    return `/maggoo/${characterId}/Body_${characterId}.png`;
  } else {
    switch (wearableId) {
      case WearableSlot.Body:
        return `/maggoo/${characterId}/Body_${characterId}.png`;
      case WearableSlot.ChestArmor:
        return `/maggoo/${characterId}/Chest_${characterId}.png`;
      case WearableSlot.Headgear:
        return `/maggoo/${characterId}/Head_${characterId}.png`;
      case WearableSlot.Backpack:
        return `/maggoo/${characterId}/Backpack_${characterId}.png`;
      case WearableSlot.RightHand:
        return `/maggoo/${characterId}/R_Hand_${characterId}.png`;
      case WearableSlot.LeftHand:
        return `/maggoo/${characterId}/L_Hand_${characterId}.png`;
      case WearableSlot.Face:
        return `/maggoo/${characterId}/Face_${characterId}.png`;
      case WearableSlot.Worm:
        return `/maggoo/${characterId}/Worm_${characterId}.png`;
      default:
        return `/maggoo/${characterId}/Worm_${characterId}.png`;
    }
  }
};

export const getCharacterId = (tokenId: any) => {
  return Number(
    tokenId /
      BigInt(getIsBase(tokenId) ? BODY_TOKEN_ID_START : WEARABLE_TOKEN_ID_START)
  );
};

export const getWearableId = (tokenId: any) => {
  return Number(
    tokenId %
      BigInt(getIsBase(tokenId) ? BODY_TOKEN_ID_START : WEARABLE_TOKEN_ID_START)
  );
};

export const getIsBase = (tokenId: any) => {
  return tokenId >= BigInt(BODY_TOKEN_ID_START);
};

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getHashPower = (characterId : any, slot:WearableSlot) => {
  const total = 1000;
  const hpInitialization = 16;
  const totalHPInitialization = 91;
  
  return "ersan"
}