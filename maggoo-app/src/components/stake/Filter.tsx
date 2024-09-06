import { Energy } from "@/utils/Icons";
import { Button, Image, Input } from "@nextui-org/react";
import React from "react";

const Filter = () => {
  return (
    <div className="xl:w-[300px] lg:w-[275px] md:w-[230px] border-2 border-black  flex flex-col min-h-[85.5vh] gap-5 sm:h-[90vh]  bg-header-bg py-10 px-4 rounded-xl">
      <div className="w-full gap-2 flex flex-col  ">
        <p className="text-white">Total Hash Power</p>
        <Input
          startContent={
            <div>
              <Energy height={211} color={"#abc6d9"} />
            </div>
          }
          value={"123123"}
          disabled
          className=" text-white "
          classNames={{
            input:
              "text-white group-data-[has-value=true]:text-white group-data-[has-value=true]:text-xl ",
            base: "data-[hover=true]:bg-transparent text-white ",
            inputWrapper:
              "bg-transparent border border-c-primary data-[hover=true]:bg-transparent text-white h-16 rounded-sm"
          }}
        />
      </div>
      <div className="w-full gap-2 flex flex-col  ">
        <p className="text-white">My Hash Power</p>
        <Input
          value={"123123"}
          startContent={
            <div>
              <Energy height={211} color={"#abc6d9"} />
            </div>
          }
          disabled
          className=" text-white relative "
          classNames={{
            input:
              "text-white group-data-[has-value=true]:text-white group-data-[has-value=true]:text-xl ",
            base: "data-[hover=true]:bg-transparent text-white ",
            inputWrapper:
              "bg-transparent border border-c-primary data-[hover=true]:bg-transparent text-white h-16 rounded-sm"
          }}
        />
        <Image
          src="/icons/energy.svg"
          className="top-10 bg-white absolute z-50 left-0"
          alt="energy"
        />
      </div>
      <div className="w-full gap-2 flex flex-col  ">
        <p className="text-sm flex  gap-2 text-primary-300 justify-center items-center ">
          Reward
          <span className="text-[10px] text-gray-400 flex items-end justify-end w-full md:text-[8px]">
            1000 Hash Power - 039 MAG Per Day
          </span>
        </p>
        <Input
          startContent={<Image src="/icons/mag.svg" height={30} />}
          value={"1313 "}
          disabled
          className=" text-white "
          classNames={{
            input:
              "text-white group-data-[has-value=true]:text-white group-data-[has-value=true]:text-xl",
            base: "data-[hover=true]:bg-[#1F1F34] text-white",
            inputWrapper:
              "bg-[#1F1F34] border-2 border-primary-300 focus:bg-[#1f1f34] data-[hover=true]:bg-[#1F1F34] text-white h-16 rounded-sm"
          }}
        />
      </div>
      <div className="w-full pt-2 ">
        <Button
          className={` btn btn-primary text-2xl h-16 border w-full text-white`}>
          Claim
        </Button>
      </div>
    </div>
  );
};

export default Filter;
