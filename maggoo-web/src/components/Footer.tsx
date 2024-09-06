import React from "react";
import { Button, Image, Input, Link } from "@nextui-org/react";
import { Lilita_One } from "next/font/google";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"]
});

const Footer = () => {
  return (
    <div
      className={`${lilita.className} bg-header-bg gap-10 justify-between h-full flex-col sm:px-0 pt-10 sm:pt-10 sm:z-50 flex w-full px-20 relative`}>
      <div className="absolute w-full h-[12px] bg-blue-800 sm:hidden top-0 blur-2xl left-0" />
      <div className="w-full  flex sm:flex-col gap-10 justify-between sm:px-20 items-center">
        <Image
          src="/logo/logo.webp"
          className="xl:w-[200px] sm:w-[400px] sm:z-20 bg-transparent"
          alt="logo"
        />
        <div className="sm:hidden flex flex-col">
          <p className="text-white text-xl ">Subscribe to our newsletter</p>
          <Input placeholder="Email address" />
        </div>
      </div>

      <div className="sm:px-5">
        <p className="text-gray-500 sm:w-full xl:w-2/6 text-md sm:text-center">
          Maggoo Land is a community driven decentralized P2E gaming platform
          with upgradable NFT cult characters called Maggoo.
        </p>
      </div>

      <div className="w-full flex items-center sm:flex-col-reverse sm:gap-10 sm:px-20 justify-between">
        <div className="flex flex-col  sm:w-full  gap-2">
          <p className="text-white sm:text-center">Follow us</p>
          <div className="flex gap-5 sm:justify-between sm:hidden ">
            <Link
              href="https://twitter.com/MaggooLand"
              target="_blank"
              className=" cursor-pointer bg-transparent">
              <Image
                className="bg-transparent"
                src="/icons/twitter.svg"
                alt="twitter"
              />
            </Link>
            <Link className=" cursor-pointer">
              <Image
                className="bg-transparent"
                src="/icons/telegram.svg"
                alt="telegram"
              />
            </Link>
          </div>
          <div className="gap-5 sm:justify-between hidden sm:flex ">
            <Link
              href="https://twitter.com/MaggooLand"
              target="_blank"
              className=" cursor-pointer text-white">
              Twitter
            </Link>
            <Link className="text-white cursor-pointer">Telegram</Link>
          </div>
        </div>
      </div>
      <div className="text-white justify-between border-t pt-10 pb-5 sm:pb-0 sm:pt-5 sm:gap-5 flex gap-10 sm:flex-col">
        <div className="flex gap-10 sm:px-20 sm:w-full sm:justify-between ">
          <Button className="bg-transparent text-white" as={Link}>
            Terms of use
          </Button>
          <Button className="bg-transparent text-white" as={Link}>
            Privacy Policy
          </Button>
        </div>
        <div className="sm:bg-gray-800 sm:w-full sm:py-5">
          <p className="sm:text-center">
            Powered by Maggoo. Copyrights 2024. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
