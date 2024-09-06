import { Image } from "@nextui-org/react";
import React from "react";

const ShowCase = () => {
  return (
    <div className="h-full">
      <div className="upgrade_cards w-full    ">
        <div className="item border border-black border-r-0">
          <div className="badges-wrapper">
            <div className="badge">
              <div>
                <span>999</span>
              </div>
            </div>
          </div>
          <div className="absolute top-5 right-5">rarity</div>

          <div className="flex flex-col items-center justify-center relative w-full h-full bounce">
            <Image
              src="/maggoo/1/Worm_1.png"
              className=" h-full min-h-[525px] w-full z-50 object-cover"
              alt="asd"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
