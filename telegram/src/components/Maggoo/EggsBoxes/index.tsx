import { FC, useEffect } from "react";
import Image from "next/image";
import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { DEPOSIT_RECEIVER_ADDRESS } from "@/app/constants";
import { useUtils } from '@telegram-apps/sdk-react';

export const EggsAndBoxes: FC<any> = ({ color, className, ...rest }) => {

    const [tonConnectUI, setOptions] = useTonConnectUI();
    const wallet = useTonWallet();
    const utils = useUtils();


   useEffect(()=>{

    if(wallet){
        const {
            account: { chain, publicKey, address },
            device: {
              appName,
              appVersion,
              maxProtocolVersion,
              platform,
              features,
            },
          } = wallet;
    }
 
   },[wallet])
    
    const handleOpenEgg = async () => {
   
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 3600,
            messages: [
                {
                    address: DEPOSIT_RECEIVER_ADDRESS, // destination address
                    amount: "1000000000" //Toncoin in nanotons
                }
            ]
        }
        tonConnectUI.sendTransaction(transaction)
    }

    const handleOpenMysteriosBox = async () => {
    
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 3600,
            messages: [
                {
                    address: DEPOSIT_RECEIVER_ADDRESS, // destination address
                    amount: "100000000" //Toncoin in nanotons
                }
            ]
        }

        tonConnectUI.sendTransaction(transaction)


    } 
    return (
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
                    width={150}
                    height={260}
                    className="bg-transparent"
                />


                 {   wallet  ? 
                         <Button onClick={()=>{
                            handleOpenEgg()
                          }} className=" btn-primary  w-full py-6 text-2xl">
                            <p>1 TON </p>
                          </Button>
                 : 
                    <TonConnectButton className='ton-connect-page__button'/>
                 }
          

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
                    width={150}
                    height={260}
                    className="bg-transparent"
                />

                {
                    wallet ?   <Button onClick={()=>{
                        handleOpenMysteriosBox()
                    }} className=" btn-primary  w-full py-6 text-2xl">
                        <p>0.1 TON </p>
                      </Button> : 
                     <TonConnectButton className='ton-connect-page__button'/>

                }
              

                <p className="text-c-primary text-sm sm:text-center  sm:text-xs">
                    Mystery Box contains various items with certain hash powers
                </p>
            </div>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>

      
    </>
)}