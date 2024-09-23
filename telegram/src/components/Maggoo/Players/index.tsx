import { Avatar, Button, Image, Card, CardBody, Link, ScrollShadow, Spinner, Tab, Tabs, User } from "@nextui-org/react";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useEffect, useMemo, useState } from "react";
import { initUtils } from '@telegram-apps/sdk';
import { getUserAvatarUrl } from "@/app/constants";
import { useGlobalState } from "@/context/GlobalStateContext";
import NFTCard from "../NFTCard";
import useAxiosPost from "@/hooks/useAxios";

export const Players: FC<any> = ({ color, className, ...rest }) => {
    const lp = useLaunchParams();
    const initData = useInitData();
    const utils = initUtils();
    const { userData } = useGlobalState(); // Global state'ten veriyi al
    const [cursor, setCursor] = useState<any>(null);
    const { data, error, loading, postData } = useAxiosPost(`/maggoo/players`);
    const [users, setUsers] = useState<any>([]);



    useEffect(() => {
        loadMoreUsers()
    }, [])

    const loadMoreUsers = async () => {
        let params: any = {
            cursor: parseInt(cursor) || 0
        }
        await postData(params)
    };

    useEffect(() => {
        if (!loading) {
            if (data) {
                //@ts-ignore
                setUsers(prevUsers => [...prevUsers, ...data.users]);
                //@ts-ignore
                setCursor(data.nextCursor);

                //@ts-ignore
                console.log("veri geldi", data.users)

            }


        }
    }, [loading])

    useEffect(() => {
        console.log("userLeng", users.length, users)
    }, [users.length])

    const Player = (props: { player: any }) => {
        return (
            <div className="w-full h-full flex border border-2 border-white/30 p-2 rounded-lg flex-col gap-2 items-center justify-center text-center">
                <Image className="w-full h-full" src={getUserAvatarUrl(props.player.UserID)} />

                <span className="!text-primary-300 w-full">{props.player.UserName}</span>
            </div>
        )
    }

    return (
        <>

            <div className="rounded-lg bg-white/30 border border-2 border-white/30 p-4 w-full flex flex-row gap-2 items-start justify-between">
                <span className="!text-primary-300 text-lg  w-full">Total User Count</span>

                {
                    loading ? <div className="w-full flex flex-col justify-center items-end">
                        <Spinner size="sm" color="success" labelColor="success" />

                    </div> : <><span className="text-success-500 text-lg w-full text-end">
                        {data && (data as any).totalUserCount}
                    </span>
                    </>
                }

            </div>

            <ScrollShadow orientation="vertical" size={100} hideScrollBar className="grid grid-cols-3 w-full overflow-x-hidden h-full p-2 max-h-[calc(100vh-220px)] gap-4">


                {
                    users.map((player: any, index: number) => (
                        <Player key={`maggooItem${player.UserID}-${index}`} player={player} />
                    ))
                }
            </ScrollShadow>

            <Button onClick={() => {
                loadMoreUsers()
            }} fullWidth className="btn btn-primary text-2xl py-8">Load More</Button>
        </>
    );
};