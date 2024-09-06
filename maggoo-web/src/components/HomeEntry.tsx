import React from "react";
import { Button } from "@nextui-org/react";
import { Lilita_One } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"]
});

const HomeEntry = () => {
  return (
    <>
      <div
        className={` ${lilita.className} flex w-full sm:hidden  justify-center my-20 sm:py-10 sm:my-0  h-full px-10`}>
        <div className="gap-4 flex flex-col w-full ">
          <div
            className={`  flex flex-col  xl:text-9xl md:text-6xl sm:text-6xl sm:text-center `}>
            <span className="text-[#fe6d13]">MAGGOO</span>
            <span className="text-white">LAND</span>
          </div>
          <div className="sm:text-center sm:w-full sm:flex sm:justify-center ">
            <p className="text-white w-2/6 text-xl sm:text-3xl sm:w-full">
              Maggoo Land is a community driven decentralized P2E gaming
              platform with upgradable NFT cult characters called Maggoo.{" "}
            </p>
          </div>
          <div className="total-players sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-center  ">
            <p className="title sm:text-center ">TOTAL PLAYERS</p>
            <p className="counter">23,382,429</p>
          </div>
          <div className="flex items-center w-4/5 sm:w-full sm:flex-col sm:gap-10 justify-between">
            <div className="gap-10 flex w-full sm:gap-5 sm:flex-col  ">
              <Button
                as={Link}
                href="https://maggoo.gitbook.io/wp"
                target="_blank"
                className=" btn btn-primary w-[15%] py-6 text-2xl">
                White Paper
              </Button>
              <Button
                as={Link}
                href="https://app.maggoo.io/eggs"
                target="_blank"
                className="bg-header-bg text-white text-2xl p-9 py-6 border">
                Buy Maggoo
              </Button>
            </div>
          </div>
        </div>
        <div className=" flex absolute top-20 md:right-20 md:top-32 xl:right-56 justify-start py-5 sm:hidden  ">
          <Image
            priority
            height={1000}
            width={1000}
            src="/illustrations/heroes.png"
            alt="heroes"
            className="xl:w-[1000px] bg-transparent md:w-[500px]"
          />
        </div>
      </div>
      <div
        className={`sm:flex sm:flex-col hidden gap-5 w-full items-center justify-center ${lilita.className} relative`}>
        <div className=" flex absolute top-36 z-10 ">
          <Image
            priority
            height={350}
            width={350}
            src="/illustrations/heroes.png"
            alt="heroes"
            className="xl:w-[1000px] bg-transparent md:w-[500px] sm:w-[350px]"
          />
        </div>
        <div className="total-players sm:w-1/2 sm:flex sm:flex-col sm:justify-center sm:items-center  ">
          <p className="title sm:text-center sm:text-md ">TOTAL PLAYERS</p>
          <p className="counter text-sm">23,382,429</p>
        </div>
        <div
          className={` pt-40 flex flex-col  sm:text-3xl sm:text-center z-20 `}>
          <p className="flex gap-2">
            <span className="text-[#fe6d13]">MAGGOO</span>
            <span className="text-white">LAND</span>
          </p>
        </div>
        <div className="sm:text-center sm:w-full sm:flex sm:justify-center px-5 ">
          <p className="text-white w-2/6 text-xl sm:text-2xl sm:w-full">
            Maggoo Land is a community driven decentralized P2E gaming platform
            with upgradable NFT cult characters called Maggoo.{" "}
          </p>
        </div>

        <div className="w-full px-5 gap-5 flex flex-col">
          <Button
            as={Link}
            href="https://maggooland.gitbook.io"
            target="_blank"
            className="bg-[#fe6d13] text-white text-2xl w-full py-7 border">
            White Paper
          </Button>
          <Button 
          as={Link}
            href="https://app.maggoo.io/eggs"
          className="bg-[#09092b] text-white text-2xl w-full  py-7 border">
            Mint Maggoo
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomeEntry;
