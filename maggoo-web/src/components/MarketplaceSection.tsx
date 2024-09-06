import React from "react";
import { Lilita_One } from "next/font/google";
import { Button } from "@nextui-org/react";
import Image from "next/image";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"]
});

const MarketplaceSection = () => {
  return (
    <>
      <div
        className={` ${lilita.className} h-full relative w-full sm:hidden   `}>
        <div className="bg-[#1F1F34] h-[119vh] absolute sm:top-0 sm:h-full -top-44 w-full z-0 " />
        <div className="text-white z-50 text-center text-4xl gap-5 sm:text-3xl items-center  h-full flex  flex-col justify-center">
          <p className="z-30">ONE STOP SHOP ON ALL THINGS MAGGOO</p>
          <Image
            priority
            height={1000}
            width={1000}
            src="/illustrations/marketplace-banner.webp"
            alt="marketplace-banner"
            className="z-40"
          />
          <div className="sm:w-full sm:px-10">
            <Button className={` btn btn-primary text-2xl py-6 w-64`}>
              Marketplace
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`sm:flex flex-col gap-5 hidden ${lilita.className} pt-40`}>
        <div className="flex flex-col gap-5">
          <Image
            priority
            height={1000}
            width={1000}
            src="/illustrations/marketplace-banner.webp"
            alt="marketplace-banner"
          />
          <p className="z-30 text-white text-4xl text-center">
            ONE STOP SHOP ON ALL THINGS MAGGOO
          </p>
        </div>
        <div className="sm:w-full  sm:px-5">
          <Button
            className={` ${lilita.className} text-3xl sm:w-full  py-7 border z-30 bg-[#fe6d13] text-white`}>
            Marketplace
          </Button>
        </div>
      </div>
    </>
  );
};

export default MarketplaceSection;
