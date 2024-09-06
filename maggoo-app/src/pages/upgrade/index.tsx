"use client"; // Bu dosyanın client-side'da çalışacağını belirtir

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import MaggooUpgrade from "@/components/upgrade";

const Upgrade = () => {
  return (
    <>
      <Head>
        <title>Maggoo | Upgrade</title>
      </Head>
      <div className="w-full h-full flex justify-center py-5 flex-col gap-5 ">
        <div className="w-full flex flex-col items-center gap-5">
          <p className="text-5xl uppercase">UPGRADE</p>
        </div>

        <MaggooUpgrade/>

      </div>
    </>
  );
};

export default Upgrade;
