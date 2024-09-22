import { generateImage } from "../constants";

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

  export const getChar = async (tokenId : any ) => {

    const isBase: boolean = BigInt(tokenId) >= BODY_TOKEN_ID_START;


    return {
        isInitialized: true,
        isBaseBody: isBase,
        extraParam:"",
        tokenId: BigInt(tokenId), // Example tokenId based on timestamp
        level:"",
        levelScore: 0, // Initial level score as bigint
        hashPower:"",
        createdAt: BigInt(tokenId), // Use bigint for createdAt
        name:"",
        wearableItems:[]
    };

  }

  export const MAGGOO_ITEMS = [
    "Maggoo",
    "MAGRyan",
    "MAGStar",
    "MAGNarok",
    "MAGartan",
    "Vista",
    "GreyMAG",
    "MAGBoa",
    "MAGRai",
    "MAGparrow",
    "MAGLock",
    "MAGNeo",
    "MAGVerine",
    "El Maggoo",
    "Jokker",
    "M Vendetta",
    "MAGuid",
    "MAGobis",
    "MAGPunch",
    "MAGGod",
    "MAGCop",
    "MAGGLer",
    "Ninja",
    "MAGStein",
    "MAGassin",
    "General",
    "Gyoo",
    "Draggoo",
    "MAGNar",
    "MAGolas",
    "Mattoman",
    "MAGaddin",
    "MAGBang",
    "Maang",
    "MAGPride",
    "MAGWayne",
    "Rapper",
    "MAGKing",
    "MAGStrong",
    "007MAGBond",
    "MAGOCOP",
    "MAGDian",
    "MAGHanzo",
    "MAGBee",
    "MAGMania",
    "MAGKorok",
    "JellyMAG",
    "PriMAG",
    "IronMAG",
    "MAGSnow",
    "MAGZorro",
    "MAGDoc",
    "MAGCapone",
    "MAGBride",
    "MAGPotter",
    "MAGWarrior",
    "MAGDunk",
    "TPUMP",
    "MAGPeare",
    "MAGCyber",
    "MAGBart",
    "SuperMAG",
    "MAGMarley"
  ];
  

  export function getWearableSlot(tokenId : any, itemId : any) {
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
  
  export const getImageName = (
    isBase: any,
    characterId: any,
    wearableId: any
  ) => {
    if (isBase) {
      return generateImage(characterId,"Body");
    } else {
      switch (wearableId) {
        case WearableSlot.Body:
          return generateImage(characterId,"Body");
        case WearableSlot.ChestArmor:
          return generateImage(characterId,"Chest"); //`/maggoo/${characterId}/Chest_${characterId}.png`;
        case WearableSlot.Headgear:
          return generateImage(characterId,"Head");//`/maggoo/${characterId}/Head_${characterId}.png`;
        case WearableSlot.Backpack:
          return generateImage(characterId,"Backpack");//`/maggoo/${characterId}/Backpack_${characterId}.png`;
        case WearableSlot.RightHand:
          return generateImage(characterId,"R_Hand"); //`/maggoo/${characterId}/R_Hand_${characterId}.png`;
        case WearableSlot.LeftHand:
          return generateImage(characterId,"L_Hand");//`/maggoo/${characterId}/L_Hand_${characterId}.png`;
        case WearableSlot.Face:
          return generateImage(characterId,"Face"); //`/maggoo/${characterId}/Face_${characterId}.png`;
        case WearableSlot.Worm:
          return generateImage(characterId,"Worm");//`/maggoo/${characterId}/Worm_${characterId}.png`;
        default:
          return generateImage(characterId,"Worm");//`/maggoo/${characterId}/Worm_${characterId}.png`;
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


  export const getCharacterNameByTokenId = (tokenId : any) => {

    let characterId = getCharacterId(tokenId)
    if(getIsBase(tokenId)){
      return MAGGOO_ITEMS[characterId] 
    }else{
      let wearableId = getWearableId(tokenId)

        let characterName = MAGGOO_ITEMS[characterId] ;
        switch (wearableId) {
            case 0:
                characterName = `${characterName} >> BODY`;
                break;
            case 1:
                characterName = `${characterName} >> CHEST`;
                break;
            case 2:
                characterName = `${characterName} >> HEADGEAR`;
                break;
            case 3:
                characterName = `${characterName} >> BACKPACK`;
                break;
            case 4:
                characterName = `${characterName} >> RIGHT HAND`;
                break;
            case 5:
                characterName = `${characterName} >> LEFT HAND`;
                break;
            case 6:
                characterName = `${characterName} >> FACE`;
                break;
            default:
                characterName = `${characterName} >> WORM`;
                break;
        }

        return characterName;
    }


  }

  export const getHashPower = (characterId : any, slot:WearableSlot) => {
    const total = 1000;
    const hpInitialization = 16;
    const totalHPInitialization = 91;
    const commonDifference = 7;



    let hpTotal =  totalHPInitialization + (characterId - 1) * commonDifference;

    let wearableSlot = slot
    let bodyHP = hpInitialization + (characterId - 1)
    let hashPower = 0
    switch (wearableSlot) {
      case WearableSlot.Body:
        hashPower = bodyHP
        break
      case WearableSlot.ChestArmor:
        hashPower = bodyHP - 1 
        break
      case WearableSlot.Headgear:
        hashPower =  bodyHP - 2
        break
      case WearableSlot.Backpack:
        hashPower =  bodyHP - 3
        break
      case WearableSlot.RightHand:
        hashPower =  bodyHP - 4
        break
      case WearableSlot.LeftHand:
        hashPower =  bodyHP - 5
        break
      case WearableSlot.Face:
        hashPower =  bodyHP - 6
        break
      case WearableSlot.Worm:
        hashPower = hpTotal
        break
      default:
        hashPower = hpTotal
        break
    }
       
    return hashPower
  }

  export const getHashPowerStr = (tokenId : any) => {
    let isBody = BigInt(tokenId) >= BigInt(BODY_TOKEN_ID_START);

    let divider = isBody  ? BODY_TOKEN_ID_START : WEARABLE_TOKEN_ID_START

    let characterId = Math.floor(Number(tokenId) / divider);
    let wearableId = Math.floor(Number(tokenId) % divider);

    let wearableSlot = isBody ? WearableSlot.Body : wearableId

    return getHashPower(characterId,wearableSlot).toString() 
  }