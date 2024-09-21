import { Avatar, Button, Image, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Spinner, useDisclosure, User } from "@nextui-org/react";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useEffect, useMemo, useState } from "react";
import { initUtils } from '@telegram-apps/sdk';
import { getUserAvatarUrl } from "@/app/constants";
import { useGlobalState } from "@/context/GlobalStateContext";
import useAxiosPost from "@/hooks/useAxios";

export const Referrals: FC<any> = ({ color, className, ...rest }) => {
    const lp = useLaunchParams();
    const initData = useInitData();
    const utils = initUtils();
    const { postData } = useGlobalState(); // Global state'ten veriyi al


    const userRows = useMemo<any | undefined>(() => {
        return initData && initData.user ? initData.user : undefined;
    }, [initData]);

    useEffect(() => {
        console.log(postData)
    }, [postData])


    const ReferralCard = (referralItem: any) => {

        const { isOpen, onOpen, onOpenChange } = useDisclosure();
        const [modalPlacement, setModalPlacement] = useState("auto");

        const { data, error, loading, postData } = useAxiosPost('/maggoo/claim');


        const handleClaim = async (refInfo: any) => {
            console.log("handleClaim:refInfo", refInfo.referral)
            const userInfo: any = {
                user: refInfo.referral,
            };
            onOpen()
            await postData(userInfo); // userInfo'yu sunucuya gönder

        }

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
                                                <div className="w-full flex items-center justify-center">
                                                    <Image
                                                        loading="eager"
                                                        src="/eggs/egg_open.png"
                                                        alt="egg"
                                                        width={400}
                                                        height={400}
                                                        className="bg-transparent"
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
                                base: "text"
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

                        <Button isDisabled={referralItem.referral.IsRefClaimed} onClick={() => {
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

            <ScrollShadow hideScrollBar className="w-full h-[400px]">

                <div className="w-full flex flex-col gap-2" style={{ color }}>
                    {postData && postData.referrals.map((referral: any) => (
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