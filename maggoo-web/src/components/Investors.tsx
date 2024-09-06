import { Lilita_One } from "next/font/google";
import React from "react";
import Image from "next/image";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"]
});

const logos = [
  "/logo/kewl.jpg",
  "/logo/kayen.png",
  "/logo/chiliz.svg",
  "/logo/diviswap.png",
  "/logo/chilizswap.jpg"
];

const Investors = () => {
  return (
    <>
      <div
        className={`${lilita.className} sm:hidden relative h-full  z-40 bg-white`}>
        <div className="heroes sm:right-0 sm:hidden  w-[900px] sm:w-[500px]">
          <Image
            width={400}
            height={400}
            priority
            draggable="false"
            src="/illustrations/heroes.png"
            alt="heroes"
            className="xl:w-[900px] sm:w-[400px] bg-transparent"
          />
        </div>
        <div className="text-center text-5xl pt-10">
          <p>INVESTOR & PARTNER</p>
        </div>
        <div className="marquee  w-full flex justify-center h-60 items-center relative">
          <div className="xl:w-3/4 md:w-full sm:w-full flex overflow-hidden h-40 rounded-xl relative">
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute -left-16 top-0 w-40 h-40 bg-white opacity-100 rounded-full blur-xl filter" />
              <div className="absolute left-[-70px] top-[50%] transform -translate-y-1/2 w-56 h-56 bg-white opacity-100 rounded-full blur-xl filter" />
              <div className="absolute right-[-50px] top-[-50px] w-40 h-40 bg-white opacity-100 rounded-full blur-2xl filter" />
              <div className="absolute -right-16 top-[50%] transform -translate-y-1/2 w-56 h-56 bg-white opacity-100 rounded-full blur-xl filter" />
            </div>
            <div className="marquee">
              <div className="marquee-content w-full h-full md:gap-20 gap-40">
                {[...logos].map((item: string, index: number) => (
                  <Image
                    width={150}
                    height={400}
                    priority
                    draggable="false"
                    src={item}
                    className="logo-item bg-transparent inline-block "
                    alt={`logo-${index}`}
                    key={index + 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="cloud-bg sm:-bottom-48 "></div>
        <div className="mountain-bg sm:bottom-0"></div>
        <div className="bg-rectangle sm:bottom-0"></div>
      </div>
      <div
        className={`sm:flex hidden ${lilita.className} h-[500px] bg-white relative w-full flex-col`}>
        <div className="mobil-heroes absolute z-20">
          <Image
            width={500}
            height={400}
            priority
            draggable="false"
            src="/illustrations/heroes.png"
            alt="heroes"
            className="sm:-bottom-10 bg-transparent"
          />
        </div>
        <div className="text-center text-2xl  pt-10 w-full z-40">
          <p className="text-center">INVESTOR & PARTNER</p>
        </div>
        <div className="marquee w-full flex justify-center h-40 items-center">
          <div className="w-full flex overflow-hidden h-40 rounded-xl relative">
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute -left-16 top-0 w-20 h-20 bg-white opacity-100 rounded-full blur-xl filter" />
              <div className="absolute left-[-100px] top-[50%] transform -translate-y-1/2 w-40 h-44 bg-white opacity-100 rounded-full blur-xl filter" />
              <div className="absolute -right-40 top-[50%] transform -translate-y-1/2 w-56 h-56 bg-white opacity-100 rounded-full blur-xl filter" />
            </div>

            <div className="marquee-content flex w-full items-center justify-between gap-10">
              {logos.map((item: string, index: number) => (
                <Image
                  width={50}
                  height={50}
                  priority
                  draggable="false"
                  src={item}
                  className="logo-item  bg-transparent h-full min-w-[90px]"
                  alt={`logo-${index}`}
                  key={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mobil-cloud-bg  "></div>
        <div className="mobil-mountain-bg sm:bottom-0 "></div>
        <div className="mobil-bg-rectangle sm:bottom-0"></div>
      </div>
    </>
  );
};

export default Investors;
