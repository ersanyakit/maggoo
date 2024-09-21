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

export const Wallet: FC<any> = ({ color, className, ...rest }) => {

    const [tonConnectUI, setOptions] = useTonConnectUI();
    const wallet = useTonWallet();
    const utils = useUtils();
    const { userData } = useGlobalState(); // Global state'ten veriyi al






    return (
        <>
            <Tabs classNames={{
                tabList: "backdrop-blur-sm bg-white/10",
                tabContent: "text-white"
            }} fullWidth aria-label="Options">
                <Tab key="wallet" title="WALLET">
                    <Card className="backdrop-blur-sm bg-transparent">
                        <CardBody>
                       


                      
                        <ScrollShadow hideScrollBar className="w-full h-[400px]">


                                    {
                                        userData && userData.balanceInfo.map((item: any, index: number) => (

                                            <div key={`magggoo${index}`} className="w-full overflow-none w-[185px] h-[260px]">
                                                <Maggoo tokenId={item.token_identifier} isMarketItem={false} />
                                            </div>
                                        ))}

                                
                            </ScrollShadow>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>


        </>
    )
}