import { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Avatar, Button, Card, CardBody, ScrollShadow, Spinner, Tab, Tabs } from "@nextui-org/react";
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { DEPOSIT_RECEIVER_ADDRESS } from "@/app/constants";
import { initHapticFeedback, useInitData, useLaunchParams, useUtils } from '@telegram-apps/sdk-react';
import { DisplayData } from "@/components/DisplayData/DisplayData";
import { List, Section, Cell, Navigation, Title, Placeholder } from "@telegram-apps/telegram-ui";
import InitDataPage from "@/app/init-data/page";
import Maggoo from "../Maggoo";
import { getChar } from "@/app/utils/constants";
import { useGlobalState } from "@/context/GlobalStateContext";
import NFTCard from "../NFTCard";
import useAxiosPost from "@/hooks/useAxios";

export const Wallet: FC<any> = ({ color, className, ...rest }) => {
    const { data, error, loading, postData } = useAxiosPost('/maggoo/sync');
    const { setUserData, userData } = useGlobalState(); // Global state'e erişim
    const hapticFeedback = initHapticFeedback();

    const [tonConnectUI, setOptions] = useTonConnectUI();
    const wallet = useTonWallet();
    const utils = useUtils();
    const lp = useLaunchParams();
    const initData = useInitData();

    const [isDataSent, setIsDataSent] = useState(false); // Tekrar gönderim kontrolü

    const userRows = useMemo(() => {
        return initData?.user ? initData : undefined;
    }, [initData]);

    const sendData = async () => {
        if (userRows && !isDataSent) { // Sadece data gönderilmediğinde gönder
            const userInfo = {
                user: userRows.user,  // initData içinden doğru çekildiğine emin olun
                referrall: lp.startParam || userRows.startParam || "",
            };
            try {
                await postData(userInfo).then(() => {
                    setIsDataSent(true); // Data başarıyla gönderildiğinde kontrolü değiştir
                });
                console.log('Data sent successfully');
            } catch (error) {
                console.error('Error sending data:', error);
            }
        }
    };

    useEffect(() => {
        if (userRows) {
            sendData();
        }
    }, [userRows]);

    useEffect(() => {
       if(!loading){
        if(data){
            setUserData(data);
            console.log(data)
        }
       }
    }, [loading]);


    return (
        <>
            <Tabs 
             onSelectionChange={()=>{
                hapticFeedback.impactOccurred("soft")
              }}
            classNames={{
                tabList: "backdrop-blur-sm bg-white/10",
                cursor: "w-full border border-2 border-primary-100 bg-primary-300 text-white",
                tabContent: "group-data-[selected=true]:text-[#fff] text-white/50",
            }} fullWidth aria-label="Options">
                <Tab key="wallet" title={"MAGGOO"}>
                    <Card className="backdrop-blur-sm bg-transparent">
                        <CardBody>
                            <ScrollShadow hideScrollBar style={{ height: `calc(100vh - 400px)` }} className="w-full flex flex-col gap-2">
                                
                            {
                                            loading ? (
                                                <div className="w-full h-screen flex items-center justify-center">

                                                <Spinner classNames={{
                                                    label: "text-3xl"
                                                }} label="Loading... Please Wait!" color="warning" labelColor="warning" />
                    
                                            </div>
                                            ) : (
                                                
                                                    userData && userData.balanceInfo.map((item: any, index: number) => (
                                                        <div key={`magggoo${index}`} className="w-full overflow-none p-2 w-full">
                                                            <NFTCard item={item} tokenId={item.token_identifier} />
                                                        </div>
                                                    ))
                                                
                                            )
                                        }

                                 
                               
                            </ScrollShadow>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key={"tokens"} title={"TOKENS"}>
                    TONS OF TOKEN
                </Tab>
            </Tabs>
        </>
    );
};