import { Avatar, Button, Image, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Spinner, useDisclosure, User } from "@nextui-org/react";
import { initHapticFeedback, useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useEffect, useMemo, useState } from "react";
import { initUtils } from '@telegram-apps/sdk';
import { generateImage, getUserAvatarUrl } from "@/app/constants";
import { useGlobalState } from "@/context/GlobalStateContext";
import useAxiosPost from "@/hooks/useAxios";

export const Referrals: FC<any> = ({ color, className, ...rest }) => {
    const lp = useLaunchParams();
    const initData = useInitData();
    const utils = initUtils();
    const { userData } = useGlobalState(); // Global state'ten veriyi al


    const userRows = useMemo<any | undefined>(() => {
        return initData && initData.user ? initData.user : undefined;
    }, [initData]);




    const ReferralCard = (referralItem: any) => {

        const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
        const [modalPlacement, setModalPlacement] = useState("auto");

        const { data, error, loading, postData } = useAxiosPost('/maggoo/claim');
        const hapticFeedback = initHapticFeedback();


        const handleClaim = async (refInfo: any) => {
            hapticFeedback.impactOccurred('heavy');

            console.log("handleClaim:refInfo", refInfo.referral)
            const userInfo: any = {
                user: refInfo.referral,
            };
            onOpen()
            await postData(userInfo).then(()=>{
                referralItem.referral.IsRefClaimed = true
            }) 
           
        }
     
        useEffect(()=>{
            if(data){
                
                console.log("gelenData",(data as any).ReferralMintID)

            }

        },[data])

        return (
            <>
                <Modal
                    size="full"
                    className="bg-transparent backdrop-blur-sm "
                    isOpen={isOpen}
                    placement={"auto"}
                    onOpenChange={onOpenChange}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-white">Claim</ModalHeader>
                                <ModalBody>
                                    <div className="w-full h-full p-2 gap-2 flex items-center justify-center">
                                        {
                                            loading ? (
                                                <Spinner labelColor="primary" classNames={{
                                                    base: "text-white",
                                                    wrapper: "text-white"
                                                }} className="text-white" label="Claiming... Please Wait!" color="warning" />
                                            ) : (
                                                <div className="w-full flex items-center justify-center relative">
                                                <Image
                                                    loading="eager"
                                                    src="/eggs/egg_open.png"
                                                    alt="egg"
                                                    width={400}
                                                    height={400}
                                                    className="bg-transparent"
                                                />
                                                <Image
                                                removeWrapper
                                                    loading="eager"
                                                    src={generateImage(((data as any).ReferralMintID ?? 1), "Body")}
                                                    alt="body"
                                                    width={200} // İstediğiniz boyuta göre ayarlayın
                                                    height={400} // İstediğiniz boyuta göre ayarlayın
                                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent"
                                                />
                                            </div>
                                            )
                                        }
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="btn-primary w-full py-6 text-2xl" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                <div className="w-full rounded-lg p-2  backdrop-blur-sm  bg-transparent">
                    <div className="rounded-lg text-primary-500 p-2 border border-2 border-white/30 flex items-center justify-between">
                        <User
                            
                            classNames={{
                                base: "",

                            }}
                            name={referralItem.referral.NickName}
                            description={(
                                <Link className="text-primary-300"
                                    href={`https://t.me/${referralItem.referral.UserName ? referralItem.referral.UserName : "maggooio"} `} size="sm" isExternal>
                                    @{referralItem.referral.UserName ? referralItem.referral.UserName : "maggooio"}
                                </Link>
                            )}
                            avatarProps={{
                                src: getUserAvatarUrl(referralItem.userId)
                            }}
                        />

                        <Button isLoading={loading} isDisabled={referralItem.referral.IsRefClaimed} onClick={() => {
                            handleClaim(referralItem)
                        }} className={referralItem.referral.IsRefClaimed ? "btn-claimed" : "btn-primary" + "  py-2 text-lg"}>
                            {referralItem.referral.IsRefClaimed ? "Claimed" : "Claim"}
                        </Button>
                    </div>
                </div>
            </>
        );
    };




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

            <ScrollShadow hideScrollBar className="w-full" style={{ height: `calc(100vh - 470px)` }} >

                <div className="w-full flex flex-col gap-2" style={{ color }}>
                    {userData && userData.referrals.map((referral: any) => (
                        <ReferralCard
                            key={referral.ID}
                            name={referral.UserName}
                            userId={referral.UserID}
                            nickName={referral.NickName}
                            referral={referral}
                        />
                    ))}

                </div>
            </ScrollShadow>
            <div className="w-full flex flex-row gap-2 rounded-lg">

                <Button onClick={() => {
                    handleShare()
                }} className=" btn-primary  w-full py-6 text-2xl">
                    Invite Friends
                </Button>

                <Button onClick={() => {
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