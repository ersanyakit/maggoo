import { Avatar, Button, Link, ScrollShadow, User } from "@nextui-org/react";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useMemo } from "react";
import { initUtils } from '@telegram-apps/sdk';
import { getUserAvatarUrl } from "@/app/constants";

export const Referrals: FC<any> = ({ color, className, ...rest }) => {
    const lp = useLaunchParams();
    const initData = useInitData();
    const utils = initUtils();

    const userRows = useMemo<any | undefined>(() => {
        return initData && initData.user ? initData.user : undefined;
      }, [initData]);

    const ReferralCard = (referralItem: any) => {
        return (
            <div className="rounded-lg text-primary-500 backdrop-blur-sm  bg-white/30 p-2 border border-2 flex items-center">
              <User   
                    classNames={{
                        base:"text"
                    }}
                    name={referralItem.name}
                    description={(
                        <Link className="text-primary-300" href="https://twitter.com/ersanyakit" size="sm" isExternal>
                          @ersanyakit
                        </Link>
                      )}
                    avatarProps={{
                        src: getUserAvatarUrl(referralItem.userId)
                    }}
                    />
            </div>
        );
    };


    const handleCopyToClipboard = async () => {
        let text = `https://t.me/maggoobot?start=${userRows?.id?.toString()}`    
        try {
            await navigator.clipboard.writeText(text);
            //setCopySuccess("Text copied to clipboard!");
          } catch (err) {
            //setCopySuccess("Failed to copy text.");
          }
    }

    const handleShare = () => {
        let text = `https://t.me/maggoobot/maggooland?start=${userRows?.id?.toString()}`    
        let message = "Play with me and become a Maggoo! A real way to earn money 💵 Plus, get 10k bonus coins to kickstart your Maggoo journey!"
        utils.shareURL(text, message);

    }

    return (
        <div className={`w-full h-full flex gap-2 flex-col ${className}`} {...rest}>

            <ScrollShadow hideScrollBar className="w-full h-[400px]">

                <div className="w-full flex flex-col gap-2" style={{ color }}>
                    <ReferralCard name={"Ersan"} userId={1} />
                    <ReferralCard name={"Ersan"} userId={2}/>
                    <ReferralCard name={"Ersan"} userId={3}/>
                    <ReferralCard name={"Ersan"} userId={4}/>
                    <ReferralCard name={"Ersan"} userId={5}/>
                    <ReferralCard name={"Ersan"} userId={6} />
                    <ReferralCard name={"Ersan"} userId={7}/>
                    <ReferralCard name={"Ersan"} userId={8}/>
                    <ReferralCard name={"Ersan"} userId={9}/>
                    <ReferralCard name={"Ersan"} userId={10}/>
                    <ReferralCard name={"Ersan"} userId={11}/>
                    <ReferralCard name={"Ersan"} userId={12}/>
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