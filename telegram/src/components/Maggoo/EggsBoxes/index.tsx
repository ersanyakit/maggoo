import { FC } from "react";
import Image from "next/image";
import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";

export const EggsAndBoxes: FC<any> = ({ color, className, ...rest }) => (
    <>
  <Tabs classNames={{
    tabList:"backdrop-blur-sm bg-white/10",
    tabContent:"text-white"
  }} fullWidth aria-label="Options">
        <Tab key="maggooEgg" title="MAGGOO EGG">
          <Card className="backdrop-blur-sm bg-transparent">
            <CardBody>
            <div className="w-full h-full p-2 flex-col border-2 border-white/30 flex justify-center items-center rounded-xl">
                <Image
                    src={"/eggs/egg_default.png"}
                    alt="egg"
                    width={215}
                    height={260}
                    className="bg-transparent"
                />

                  <Button className=" btn-primary  w-full py-6 text-2xl">
                    <p>1 TON </p>
                  </Button>

                <p className="text-c-primary text-sm sm:text-center  sm:text-xs">
                    Maggoo Egg contains various Maggoos with certain hash powers
                </p>
            </div>            
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="music" title="MYSTERYBOX">
        <Card className="backdrop-blur-sm bg-transparent">
        <CardBody>
            <div className="w-full h-full p-2 flex-col border-2 border-white/30 flex justify-center items-center rounded-xl">
                <Image
                    src={"/boxes/box_default.png"}
                    alt="boxes"
                    width={200}
                    height={260}
                    className="bg-transparent"
                />

                <Button className=" btn-primary  w-full py-6 text-2xl">
                    <p>0.1 TON </p>
                  </Button>

                <p className="text-c-primary text-sm sm:text-center  sm:text-xs">
                    Mystery Box contains various items with certain hash powers
                </p>
            </div>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>

      
    </>
)