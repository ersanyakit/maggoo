import { FC } from "react";

import { Lilita_One } from "next/font/google";

const lilita = Lilita_One({
    weight: "400",
    subsets: ["latin"]
});
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export const Intro: FC<any> = ({ color, className, ...rest }) => (


    <div className="w-screen h-screen flex flex-col">
        <div className="w-screen h-screen flex-col h-full flex justify-center items-center bg-[url('/illustrations/home-section-bg.webp')] sm:bg-cover bg-contain bg-no-repeat ">


            <div
                className={` ${lilita.className} flex w-full sm:hidden  justify-center my-20 sm:py-10 sm:my-0  h-full px-10`}>
              
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
           

              
            </div>
          
           

        </div>
    </div>
);
