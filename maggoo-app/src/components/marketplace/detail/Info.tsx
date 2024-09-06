import { Image } from "@nextui-org/react";
import React from "react";

const Info = ({ item }: { item: string }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full flex bg-header-bg rounded-xl flex-col">
        <div className=" flex items-center   ">
          <Image src="/maggoo/1/Worm_1.png" width={120} alt="logo" />
          <div className="flex flex-col  ">
            <p className="text-primary-200 text-xl">Details</p>
            <p className="text-2xl"> {item ?? "Worm-1"}</p>
          </div>
        </div>
        <div className="px-5 flex gap-2 items-center ">
          <p className="text-primary-200">Owned By</p>
          <p className="text-white text-lg">0x1231230x123</p>
        </div>
        <div className="p-5">
          <p>Character Details</p>
        </div>
        <div className="px-5 pb-3 flex">
          <div className="border-b-1 flex justify-between  w-full pb-2">
            <div className="flex  items-center gap-2">
              <p>Head</p>
              <Image src="/icons/confirm.svg" width={25} alt="confirm" />
            </div>
            <div className="text-[#44cc48]">123HP</div>
          </div>
        </div>
        <div className="px-5 pb-3 flex">
          <div className="border-b-1 flex justify-between  w-full pb-2">
            <div className="flex  items-center gap-2">
              <p>Face</p>
              <Image src="/icons/confirm.svg" width={25} alt="confirm" />
            </div>
            <div className="text-[#44cc48]">123HP</div>
          </div>
        </div>
        <div className="px-5 pb-3 flex">
          <div className="border-b-1 flex justify-between  w-full pb-2">
            <div className="flex  items-center gap-2">
              <p>Chest</p>
              <Image src="/icons/confirm.svg" width={25} alt="confirm" />
            </div>
            <div className="text-[#44cc48]">123HP</div>
          </div>
        </div>
        <div className="px-5 pb-3 flex">
          <div className="border-b-1 flex justify-between  w-full pb-2">
            <div className="flex  items-center gap-2">
              <p>Backpack</p>
              <Image src="/icons/confirm.svg" width={25} alt="confirm" />
            </div>
            <div className="text-[#44cc48]">123HP</div>
          </div>
        </div>
        <div className="px-5 pb-3 flex">
          <div className="border-b-1 flex justify-between  w-full pb-2">
            <div className="flex  items-center gap-2">
              <p>Right Hand</p>
              <Image src="/icons/confirm.svg" width={25} alt="confirm" />
            </div>
            <div className="text-[#44cc48]">123HP</div>
          </div>
        </div>
        <div className="px-5 pb-3 flex">
          <div className=" flex justify-between  w-full pb-2">
            <div className="flex  items-center gap-2">
              <p>Left Hand</p>
              <Image src="/icons/confirm.svg" width={25} alt="confirm" />
            </div>
            <div className="text-[#44cc48]">123HP</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
