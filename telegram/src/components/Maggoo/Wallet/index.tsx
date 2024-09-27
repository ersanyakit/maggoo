import { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Avatar, Button, Card, CardBody, ScrollShadow, Spinner, Tab, Tabs, User } from "@nextui-org/react";
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
                token:userData ? userData.token : ""
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



    const MaggooToken = (props:{tokenName: any,tokenSymbol:any,tokenIcon:any,tokenBalance : any}) => {
        return (
            <div className="w-full rounded-lg p-2  backdrop-blur-sm  bg-transparent">
            <div className="rounded-lg text-primary-500 p-2 border border-2 border-white/30 flex items-center justify-between">
                <User
                    classNames={{
                        base: "text",
                        description:"!text-primary-300"
                    }}
                    name={props.tokenName}
                    description={props.tokenSymbol}
                  
                    avatarProps={{
                        src: props.tokenIcon
                    }}
                />
                <span className="text-green-500 text-xl">{parseFloat(props.tokenBalance).toFixed(6)} {props.tokenSymbol}</span>
            </div>
        </div>
        )
    }
    const MaggooTokens = () => {
        return (
        <div className="w-full flex flex-col gap-2">
            <MaggooToken tokenIcon={"/ton.svg"} tokenName={"TON"} tokenSymbol={"TON"} tokenBalance={userData.userInfo.TON}/>
            <MaggooToken tokenIcon={"/mag.svg"} tokenName={"MAGGOO"} tokenSymbol={"MAG"} tokenBalance={userData.userInfo.MAG}/>
            <MaggooToken tokenIcon={"/kwl.svg"} tokenName={"KEWL"} tokenSymbol={"KWL"} tokenBalance={userData.userInfo.KWL}/>
            <MaggooToken tokenIcon={"/chzinu.svg"} tokenName={"CHZINU"} tokenSymbol={"CHZINU"} tokenBalance={userData.userInfo.CHZINU}/>
            <MaggooToken tokenIcon={"/chz.svg"} tokenName={"CHILIZ"} tokenSymbol={"CHZ"} tokenBalance={userData.userInfo.CHZ}/>
            <MaggooToken tokenIcon={"/fafo.svg"} tokenName={"FAFOFootyFan"} tokenSymbol={"FAFO"} tokenBalance={userData.userInfo.FAFO}/>
            <MaggooToken tokenIcon={"/angry.svg"} tokenName={"ANGRY HOOP"} tokenSymbol={"ANGRY"} tokenBalance={userData.userInfo.ANGRY}/>
            <MaggooToken tokenIcon={"/tbt.svg"} tokenName={"TBT"} tokenSymbol={"TBT"} tokenBalance={userData.userInfo.TBT}/>
            <MaggooToken tokenIcon={"/fanfan.svg"} tokenName={"FANFAN"} tokenSymbol={"FANFAN"} tokenBalance={userData.userInfo.FANFAN}/>
  
        </div>)
    }

    return (
        <>
            <Tabs 
             onSelectionChange={()=>{
                hapticFeedback.impactOccurred("soft")
              }}
            classNames={{
                tabList: "backdrop-blur-sm bg-white/10",
                cursor: "w-full border border-2 !border-primary-100 !bg-primary-300 !text-white",
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
                <Card className="backdrop-blur-sm bg-transparent">
                        <CardBody>
                            <ScrollShadow hideScrollBar style={{ height: `calc(100vh - 400px)` }} className="w-full flex flex-col gap-2">
                                
                     <MaggooTokens/>
                     </ScrollShadow>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </>
    );
};