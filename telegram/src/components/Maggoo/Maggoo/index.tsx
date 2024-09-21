import { useState, useEffect } from "react";
import styles from "../styles/styles.module.css"; // styles.css dosyasını import et
import { Avatar, Button, Link, Image } from "@nextui-org/react";
import { getChar, getCharacterId, getImageName, getWearableId, WearableSlot } from "@/app/utils/constants";
 
const Maggoo = (props: { tokenId: any; isMarketItem: boolean }) => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [characterInfo, setCharacterInfo] = useState<any>(null);

 

  const fetchCharacterInfo = async (tokenId: any) => {
    const _characterInfo = await getChar(tokenId.toString());
    setCharacterInfo(_characterInfo);
  };

  const init = async () => {
    setLoaded(false);
    if (props.tokenId) {
        await fetchCharacterInfo(props.tokenId)
 

      setLoaded(true);
    }
  }
  useEffect(() => {
    init()
  }, [props.tokenId]);

  const BaseItem = () => {
    return (
      <>
        <div className="w-full h-full relative items-center justify-center flex">
          <Image
            removeWrapper
            src={getImageName(
              false,
              getCharacterId(characterInfo.tokenId),
              WearableSlot.Worm
            )}
            width={185}
            height={260}
            className="-z-1 grayscale !opacity-25  absolute"
            alt={characterInfo.Name}
          />
          <Image
            removeWrapper
            src={getImageName(
              false,
              getCharacterId(characterInfo.tokenId),
              WearableSlot.Body
            )}
            width={185}
            height={260}
            className="w-[186px] h-[260px]  absolute"
            alt={characterInfo.Name}
          />

          {characterInfo.wearableItems.map((wearable: any, index: number) => {
            return (
              <Image
                key={"warable_items_keys_key_" + index.toString()}
                removeWrapper
                src={getImageName(
                  false,
                  getCharacterId(wearable.tokenId),
                  getWearableId(wearable.tokenId)
                )}
                width={185}
                height={260}
                className={" absolute"}
                alt={characterInfo.Name}
              />
            );
          })}
        </div>
      </>
    );
  };

  const SubItem = () => {
    return (
      <>
        <div className="w-full h-full relative items-center justify-center flex">
          <Image
            removeWrapper
            src={getImageName(
              false,
              getCharacterId(BigInt(props.tokenId)),
              WearableSlot.Worm
            )}
            width={185}
            height={260}
            className="-z-1 grayscale !opacity-25 absolute"
            alt={characterInfo.Name}
          />
          <Image
            removeWrapper
            src={getImageName(
              false,
              getCharacterId(BigInt(props.tokenId)),
              getWearableId(BigInt(props.tokenId))
            )}
            width={185}
            height={260}
            className={ "  absolute"}
            alt={characterInfo.Name}
          />
        </div>
      </>
    );
  };
  return (
    <>
      {isLoaded ? (
        <>
          {characterInfo &&
            (characterInfo.isBaseBody ? <BaseItem /> : <SubItem />)}
        </>
      ) : (
        <>
          <Image
            width={185}
            height={260}
            src="/assets/Shimmer_Worm.svg"
            className="w-[185px] h-[260px] z-50 bg-transparent "
            alt="Loading..."
          />
        </>
      )}
    </>
  );
};

export default Maggoo;
