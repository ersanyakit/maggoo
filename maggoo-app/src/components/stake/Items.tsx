import { NFTs } from "@/utils/NFTs";
import { Button, Input, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Items = () => {
  const [active, setActive] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col border-2 border-black  min-h-screen bg-header-bg py-10 px-5  rounded-xl">
      {isLoading === true ? (
        <div className="grid xl:grid-cols-4  md:grid-cols-2 sm:grid-cols-1 gap-5 sm:gap-10  ">
          {NFTs.map((item: any, index: number) => (
            <div key={`NFTs_${index}`} className="w-full col-span-1 nft_cards ">
              <div className="item   ">
                <div className="item_header">
                  <div className="title">{item.name}</div>
                  <div className="badge-wrapper">
                    <div className="badge">
                      <div>
                        <span>999</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center relative w-full h-full bounce">
                  <Image
                    src={`/maggoo/${index + 1}/Worm_${index + 1}.png`}
                    className="h-[250px] max-h-[100%] w-full "
                    alt="nft"
                    height={250}
                    width={250}
                  />
                </div>
                <div className="item_footer ">
                  <div className="border-top"></div>
                  <div className=" text-white flex-row flex justify-center    w-full">
                    <Button className="btn btn-outline-primary flex ">
                      <Image
                        priority
                        height={20}
                        width={20}
                        src="/icons/axe.svg"
                        alt=""
                      />
                      Stake
                    </Button>
                  </div>
                </div>
                <div className="top-border"></div>
                <div className="bottom-border"></div>
                <div className="left-border"></div>
                <div className="right-border"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid xl:grid-cols-4  md:grid-cols-2 sm:grid-cols-1 gap-5 sm:gap-10  ">
          {NFTs.map((item: any, index: number) => (
            <div
              key={`NFTs_${index}`}
              className="nft_cards w-full col-span-1   ">
              <div className="item   ">
                <div className="item_header ">
                  <Skeleton
                    classNames={{
                      base: "before:from-white/20 before:rounded-sm  rounded-3xl before:!duration-500 !duration-700 dark:before:to-white/20"
                    }}
                    className="title rounded-full"
                  />
                  <div className="badge-wrapper ">
                    <div className="badge  ">
                      <div className="scale-105">
                        <span className="absolute  right-1 h-full w-full ">
                          <Skeleton
                            classNames={{
                              base: "before:from-white/20 before:rounded-sm   rounded-3xl before:!duration-500 !duration-500 dark:before:to-white/20"
                            }}
                            className=" opacity-10"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center relative w-full h-full">
                  <Image
                    width={180}
                    height={180}
                    src="/assets/Shimmer_Worm.svg"
                    className="h-[180px] max-h-[100%]  w-full  bg-transparent "
                    alt="asd"
                  />
                </div>
                <div className="item_footer ">
                  <div className="border-top"></div>
                  <div className="flex   h-full w-full flex-col justify-between ">
                    <div className=" relative w-full h-full pt-1">
                      <Skeleton
                        classNames={{
                          base: "dark:before:bg-c-primary before:from-white w-1/2 h-full before:rounded-sm    rounded-3xl before:!duration-500 !duration-500 dark:before:to-white"
                        }}
                        className=" opacity-10"
                      />
                    </div>
                    <div className="flex flex-col w-full h-full ">
                      <div className="flex   w-full">
                        <div className="w-16 rounded-full flex items-center h-12">
                          <Skeleton
                            classNames={{
                              base: "dark:before:bg-c-primary before:from-white w-1/2 h-1/2 before:rounded-sm     rounded-3xl before:!duration-500 !duration-500 dark:before:to-white"
                            }}
                            className=" opacity-10"
                          />
                        </div>
                        <div className=" w-full flex items-center h-full pt-1">
                          <Skeleton
                            classNames={{
                              base: "dark:before:bg-c-primary before:from-white w-1/2 h-1/2 before:rounded-sm    rounded-3xl before:!duration-500 !duration-500 dark:before:to-white"
                            }}
                            className=" opacity-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" w-1/3 flex items-center justify-center h-full">
                    <Skeleton
                      classNames={{
                        base: "dark:before:bg-c-primary before:from-white  h-2/3 w-full before:rounded-sm  btn  btn-primary    before:!duration-500 !duration-500 dark:before:to-white"
                      }}
                      className=" opacity-10"
                    />
                  </div>
                </div>
                <div className="top-border"></div>
                <div className="bottom-border"></div>
                <div className="left-border"></div>
                <div className="right-border"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Items;
