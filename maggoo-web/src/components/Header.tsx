import { Button, Image } from "@nextui-org/react";
import React from "react";
import { Lilita_One } from "next/font/google";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"]
});

const Header = () => {
  return (
    <div className="w-full h-24 bg-[#09092b] flex text-white justify-between items-center px-5  ">
      <div>
        <Image
          src="/logo/logo.webp"
          className="bg-transparent"
          alt="logo"
          width={200}
        />
      </div>
      <div className={`w-1/3 flex justify-between ${lilita.className}  `}>
        <Button className={`  text-xl bg-transparent text-white`}>P2E</Button>
        <Button className={`  text-xl bg-transparent text-white`}>
          Partners
        </Button>
        <Button className={`  text-xl bg-transparent text-white`}>Games</Button>
        <Button className={` text-xl bg-transparent text-white`}>
          White Paper
        </Button>
      </div>
      <div>
        <Button
          className={` ${lilita.className} text-xl bg-[#fe6d13] text-white`}>
          Launch APP
        </Button>
      </div>
    </div>
  );
};

export default Header;
