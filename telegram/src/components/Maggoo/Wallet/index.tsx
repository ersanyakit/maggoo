import { FC, useEffect } from "react";
import Image from "next/image";
import { Avatar, Button, Card, CardBody, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { DEPOSIT_RECEIVER_ADDRESS } from "@/app/constants";
import { useUtils } from '@telegram-apps/sdk-react';
import { DisplayData } from "@/components/DisplayData/DisplayData";
import { List, Section, Cell, Navigation, Title, Placeholder } from "@telegram-apps/telegram-ui";
import { address } from "framer-motion/client";
import { platform } from "os";
import { features } from "process";
import InitDataPage from "@/app/init-data/page";
import Maggoo from "../Maggoo";
import { getChar } from "@/app/utils/constants";
import { useGlobalState } from "@/context/GlobalStateContext";
import NFTCard from "../NFTCard";

export const Wallet: FC<any> = ({ color, className, ...rest }) => {

    const [tonConnectUI, setOptions] = useTonConnectUI();
    const wallet = useTonWallet();
    const utils = useUtils();
    const { userData } = useGlobalState(); // Global state'ten veriyi al






    return (
        <>
            <Tabs classNames={{
                tabList: "backdrop-blur-sm bg-white/10",
                cursor: "w-full border border-2 border-primary-100 bg-primary-300 text-white",
                tabContent: "group-data-[selected=true]:text-[#fff] text-white/50",
            }} fullWidth aria-label="Options">
                <Tab key="wallet" title={"MAGGOO"}>
                    <Card className="backdrop-blur-sm bg-transparent">
                        <CardBody>
                       


                      
                        <ScrollShadow hideScrollBar style={{ height: `calc(100vh - 400px)` }} className="w-full flex flex-col gap-2">


                                    {
                                        userData && userData.balanceInfo.map((item: any, index: number) => (

                                            <div key={`magggoo${index}`} className="w-full overflow-none p-2 w-full">
                                                <NFTCard item={item} tokenId={item.token_identifier}  />
                                            </div>
                                        ))}

                                
                            </ScrollShadow>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key={"tokens"} title={"TOKENS"}>
                    TONS OF TOKEN
                </Tab>
            </Tabs>


        </>
    )
}