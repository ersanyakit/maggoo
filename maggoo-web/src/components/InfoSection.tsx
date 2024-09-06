import React, { useRef } from "react";
import { Lilita_One } from "next/font/google";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import useIntersectionObserver from "@/hooks/useIntersection";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"]
});

const InfoSection = () => {
  const threeRef = useRef<HTMLDivElement>(null);
  const threeRef2 = useRef<HTMLDivElement>(null);

  useIntersectionObserver(threeRef);
  useIntersectionObserver(threeRef2);

  return (
    <>
      <div
        className={`${lilita.className} sm:hidden text-white gap-5 relative flex  flex-col  z-40  w-full h-full `}>
        <div className="text-7xl px-10 z-10 sm:text-6xl sm:py-20 ">
          <p>MINT, UPGRADE, STAKE,</p>
          <p>PLAY & EARN</p>
        </div>
        <div className="xl:w-1/3 md:w-2/3 flex flex-col gap-5 px-10 sm:w-full z-50">
          <p>
            Players can trade, upgrade, stake and battle their NFTs by using our
            Native token called $CHZ And Fan tokens.
          </p>
          <Button
            as={Link}
            href="https://maggoo.gitbook.io/wp/resources/ecosystem/maggoo"
            target="_blank"
            className="btn btn-primary py-6 text-2xl w-1/3 ">
            Learn More
          </Button>
        </div>
        <div className="absolute bottom-0 z-10 w-full">
          <Image
            priority
            width={1000}
            height={1000}
            draggable="false"
            src="/illustrations/home-town.webp"
            alt="town"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 z-0 w-full">
          <Image
            priority
            width={1000}
            height={1000}
            draggable="false"
            src="/illustrations/home-clouds.webp"
            alt="town"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div
        className={`sm:flex hidden text-white relative h-full mt-5 gap-5 flex-col  ${lilita.className}`}>
        <div className="absolute top-0 z-10">
          <Image
            priority
            width={1000}
            height={1000}
            draggable="false"
            src="/illustrations/home-town.webp"
            alt="town"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 z-0">
          <Image
            priority
            width={1000}
            height={1000}
            draggable="false"
            src="/illustrations/home-clouds.webp"
            alt="town"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`text-3xl  flex flex-col items-center w-full  z-10   pt-72 `}>
          <p>MINT, UPGRADE, STAKE,</p>
          <p>PLAY & EARN</p>
        </div>
        <div className="flex text-center text-sm text-gray-400">
          <p>
            Maggoo uses a deflationary token economic model combines the
            advantages of GameFi and NFT which uses unique variable supply and
            demand balance mechanisms. Creating a sustainable free-to-play and
            play-to-earn ecosystem. Players can trade, upgrade, stake and battle
            their NFTs by using our Native token called $MAG.
          </p>
        </div>
        <div className="sm:px-5 ">
          <Button
            as={Link}
            href="https://maggoo.gitbook.io/wp/resources/ecosystem/maggoo"
            target="_blank"
            className="bg-[#fe6d13] sm:w-full z-40  sm:z-10 w-1/3 text-white text-2xl  py-7 border">
            Learn More
          </Button>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
