import React, { useEffect, useState } from "react";
import { NFTs } from "@/utils/NFTs";
import { Button, Skeleton } from "@nextui-org/react";
import Image from "next/image";

const Items = () => {
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
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5 sm:gap-10  ">
          {NFTs.map((item: any, index: number) => (
            <div
              key={`NFTs_${index}`}
              className="nft_cards w-full col-span-1   ">
              <div className="item">
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
                <div className="flex flex-col items-center justify-center relative w-full h-full bounce bg-transparent">
                  <Image
                    priority
                    src={`/maggoo/${1}/Worm_${index}.png`}
                    width={250}
                    height={250}
                    className="xl:h-[250px] xl:max-h-[100%] sm:h-[220px] sm:w-[220px] w-full z-50 bg-transparent "
                    alt="WORM"
                  />
                </div>
                <div className="item_footer ">
                  <div className="border-top"></div>
                  <div className="flex  items-start h-full w-full flex-col justify-between">
                    <p className="text-c-primary">{item.name}</p>
                    <div className="flex gap-2 items-center justify-start w-full">
                      <Image
                        property=""
                        src="/logo/chz.svg"
                        width={20}
                        height={20}
                        alt="chz"
                        className="bg-transparent"
                      />
                      <p className="text-md text-primary-100">400</p>
                    </div>
                  </div>
                  <div>
                    <Button className="btn btn-primary">Buy</Button>
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
        <div className="grid xl:grid-cols-5  md:grid-cols-3 sm:grid-cols-1 gap-5 sm:gap-10  ">
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
                    width={250}
                    height={250}
                    src="/assets/Shimmer_Worm.svg"
                    className="h-[180px] max-h-[100%]  w-full z-50 bg-transparent "
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
                              base: "dark:before:bg-c-primary before:from-white w-1/2 h-1/2 before:rounded-sm z-20    rounded-3xl before:!duration-500 !duration-500 dark:before:to-white"
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
                        base: "dark:before:bg-c-primary before:from-white  h-2/3 w-full before:rounded-sm z-20 btn  btn-primary    before:!duration-500 !duration-500 dark:before:to-white"
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
