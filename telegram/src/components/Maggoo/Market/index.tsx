import { Avatar, Button, Card, CardBody, Link, ScrollShadow, Spinner, Tab, Tabs, User } from "@nextui-org/react";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useEffect, useMemo } from "react";
import { initUtils } from '@telegram-apps/sdk';
import { getUserAvatarUrl } from "@/app/constants";
import { useGlobalState } from "@/context/GlobalStateContext";
import NFTCard from "../NFTCard";
import useAxiosPost from "@/hooks/useAxios";
import BuyItem from "./BuyItem";

export const Market: FC<any> = ({ color, className, ...rest }) => {
    const lp = useLaunchParams();
    const initData = useInitData();
    const utils = initUtils();
    const { userData } = useGlobalState(); // Global state'ten veriyi al

    const { data, error, loading, postData } = useAxiosPost('/maggoo/fetch');


    const fetchMarketItems = async () => {
        await postData([])
    }

    useEffect(() => {
        fetchMarketItems()
    }, [])




    return (
        <>
            <Card className="backdrop-blur-sm bg-transparent">
                <CardBody>


                    <ScrollShadow orientation="horizontal" hideScrollBar style={{ height: `calc(100vh - 350px)` }} className="w-full p-2 overflow-x-none oveflow-x-hidden flex flex-col gap-2">


                        {
                            !loading && data && (data as any).map((item: any, index: number) => (

                                <div key={`magggoo${index}`} className="w-full min-h-[400px] overflow-x-hidden overflow-hidden w-full p-2">
                                    <BuyItem item={item} tokenId={item.token_identifier} />
                                </div>
                            ))
                        }

                        {loading && <div className="w-full h-screen flex items-center justify-center">

                            <Spinner classNames={{
                                label: "text-3xl"
                            }} label="Loading... Please Wait!" color="warning" labelColor="warning" />

                        </div>}


                    </ScrollShadow>


                </CardBody>
            </Card>


        </>
    );
};