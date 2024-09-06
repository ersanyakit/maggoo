import { Button, Image, Link, Progress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { LeftArrowIcon, RightArrowIcon } from "../Icons";
import axios from "axios";
import { CONTRACT_ADRESSES } from "@/contracts/addresses";
import { getTokenWearables } from "@/utils/constants";

const NFTSlider = ({ items }: any) => {
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [currentPercentage, setCurrentPercentage] = useState<number>(25);

  useEffect(() => {
    if (items && items.length > 0) {
      const percentage = Math.min(
        ((currentGroup + 1) / items.length) * 100,
        100
      );
      setCurrentPercentage(percentage);
    }
  }, [currentGroup, items]);

  const totalSlides: number = items.length;
  const slidesPerPage: number = 1;
  const totalGroups: number = Math.ceil(totalSlides / slidesPerPage);

  const nextGroup = () => {
    if (currentGroup === items.length - 1) {
      setCurrentGroup(0);
    } else {
      setCurrentGroup(
        currentGroup < items.length - 1 ? currentGroup + 1 : currentGroup
      );
    }
  };
  const prevGroup = () => {
    setCurrentGroup((currentGroup - 1 + totalGroups) % totalGroups);
  };

  return (
    <>
      {items && (
        <div className="w-full flex ">
          <div className="w-full overflow-x-hidden flex flex-col ">
            <div
              style={{ transform: `translateX(-${currentGroup * 100}%)` }}
              className="flex w-full duration-1000 "
            >
              {items.map((item: any, index: number) => (
                <div
                  key={"initial_key_" + index.toString()}
                  className="flex flex-col sm:gap-5 md:gap-5 xl:gap-10 py-1"
                  style={{ flex: `1 0 ${100 / slidesPerPage}%` }}
                >
                  <div className="text-primary-300 gap-2 flex sm:flex-col justify-center font-monument-regular sm:text-3xl md:text-4xl 2xl:text-5xl pr-2">
                    {getTokenWearables(item.tokenId.toString()).name}
                  </div>
                  <div className="h-1/2  w-full flex justify-center ">
                    <Image
                      className="object-fill"
                      src={getTokenWearables(item.tokenId.toString()).slot}
                      width={300}
                      alt="nft"
                    />
                  </div>
                </div>
              ))}
            </div>

            {items && items.length > 1 && (
              <div className="flex justify-between w-full items-center">
                <div className="sm:w-[40%] md:w-[40%] 2xl:w-[20%]">
                  <Progress
                    color="default"
                    size="sm"
                    aria-label="Loading..."
                    value={currentPercentage}
                    classNames={{
                      indicator: "bg-white",
                    }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    radius="sm"
                    size="lg"
                    onPress={() => prevGroup()}
                    isIconOnly
                    className="bg-transparent border border-background-border"
                    startContent={<LeftArrowIcon size={60} />}
                  />
                  <Button
                    radius="sm"
                    size="lg"
                    onPress={() => nextGroup()}
                    isIconOnly
                    className="bg-transparent border border-background-border"
                    startContent={<RightArrowIcon size={60} />}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default NFTSlider;
