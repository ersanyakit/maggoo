import { Avatar, Button, Link, ScrollShadow, User } from "@nextui-org/react";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useEffect, useMemo } from "react";
import { initUtils } from '@telegram-apps/sdk';
import { getUserAvatarUrl } from "@/app/constants";
import { useGlobalState } from "@/context/GlobalStateContext";

export const Referrals: FC<any> = ({ color, className, ...rest }) => {
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
    const ReferralCard = (referralItem: any) => {
        return (
            <div className="w-full rounded-lg p-2  backdrop-blur-sm  bg-transparent">
            <div className="rounded-lg text-primary-500 p-2 border border-2 border-white/30 flex items-center justify-between">
              <User   
                    classNames={{
                        base:"text"
                    }}
                    name={referralItem.name}
                    description={(
                        <Link className="text-primary-300" href="https://twitter.com/ersanyakit" size="sm" isExternal>
                          @{referralItem.referral.UserName}
                        </Link>
                      )}
                    avatarProps={{
                        src: getUserAvatarUrl(referralItem.userId)
                    }}
                    />

               

        <Button isDisabled onClick={()=>{
                    handleClaim(referralItem)
                }} className=" btn-primary py-2 text-lg">
                    Claim
                </Button>
            </div>
            </div>
        );
    };

    const handleClaim = async(refInfo:any) => {
        console.log("handleClaim:refInfo",refInfo)
    }


    const handleCopyToClipboard = async () => {
        let text = `https://t.me/maggoobot/maggooland?startapp=${userRows?.id?.toString()}&startApp=${userRows?.id?.toString()}`    
        try {
            await navigator.clipboard.writeText(text);
            //setCopySuccess("Text copied to clipboard!");
          } catch (err) {
            //setCopySuccess("Failed to copy text.");
          }
    }

    const handleShare = () => {
        let text = `https://t.me/maggoobot/maggooland?startapp=${userRows?.id?.toString()}&startApp=${userRows?.id?.toString()}`    
        let message = "Play with me and become a Maggoo! A real way to earn money 💵 Plus, get 10k bonus coins to kickstart your Maggoo journey!"
        utils.shareURL(text, message);

    }

    return (
        <div className={`w-full h-full flex gap-2 flex-col ${className}`} {...rest}>

            <ScrollShadow hideScrollBar className="w-full h-[400px]">

                <div className="w-full flex flex-col gap-2" style={{ color }}>
                {postData && postData.referrals.map((referral:any) => (
                    <ReferralCard
                    key={referral.ID}
                    name={referral.UserName}
                    userId={referral.UserID}
                    referral={referral}
                    />
                ))}
                 
                </div>
            </ScrollShadow>
            <div className="w-full flex flex-row gap-2 rounded-lg">

                <Button onClick={()=>{
                    handleShare()
                }} className=" btn-primary  w-full py-6 text-2xl">
                    Invite Friends
                </Button>

                <Button onClick={()=>{
                    handleCopyToClipboard()
                }} isIconOnly className=" btn-primary p-6 text-2xl">

                    <span translate="no" className="material-symbols-outlined">
                        content_copy
                    </span>
                </Button>

            </div>
        </div>
    );
};