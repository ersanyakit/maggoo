import Filter from "@/components/stake/Filter";
import Items from "@/components/stake/Items";
import { Button } from "@nextui-org/react";
import Head from "next/head";
import React, { useState } from "react";

const Stake = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenNavbar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>Maggoo | Stake</title>
      </Head>
      <div className="flex h-full justify-center w-full ">
        <div className="flex xl:w-[90%] lg:w-full md:w-full sm:w-full">
          <div
            className={`xl:w-1/5 lg:w-[30%] md:w-[40%] p-5 sm:hidden h-full`}>
            <div className="xl:fixed md:fixed sm:flex">
              <Filter />
            </div>
          </div>

          <div className="w-full flex xl:justify-end lg:justify-center md:justify-center ">
            <div className="xl:w-[90%] lg:w-[80%] md:w-[90%]  h-full py-5  sm:w-full sm:px-5">
              <Items />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:flex hidden w-full py-10 ">
        <div className="w-full fixed bottom-0 z-30 bg-header-bg py-5 px-5">
          <Button
            onClick={() => handleOpenNavbar()}
            className="w-full px-5 btn btn-primary">
            EARNINGS
          </Button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 z-10 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOpenNavbar}
      />

      {/* Mobile sidebar */}
      <div
        className={`fixed top-16 left-0 h-screen w-full  transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="p-5">
          <Filter />
        </div>
      </div>
    </>
  );
};

export default Stake;
