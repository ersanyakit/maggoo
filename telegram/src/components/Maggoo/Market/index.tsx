import { Avatar, Button, Link, ScrollShadow, User } from "@nextui-org/react";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useEffect, useMemo } from "react";
import { initUtils } from '@telegram-apps/sdk';
import { getUserAvatarUrl } from "@/app/constants";
import { useGlobalState } from "@/context/GlobalStateContext";

export const Market: FC<any> = ({ color, className, ...rest }) => {
    const lp = useLaunchParams();
    const initData = useInitData();
    const utils = initUtils();
    const { postData } = useGlobalState(); // Global state'ten veriyi al

    const userRows = useMemo<any | undefined>(() => {
        return initData && initData.user ? initData.user : undefined;
      }, [initData]);

    useEffect(()=>{
        console.log(postData)
    },[postData])
   



    return (
        <div className={`w-full h-full flex gap-2 flex-col ${className}`} {...rest}>

            
         
        </div>
    );
};