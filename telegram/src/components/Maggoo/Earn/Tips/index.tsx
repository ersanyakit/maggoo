import { Avatar, Button, Image, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Spinner, useDisclosure, User } from "@nextui-org/react";
import { initHapticFeedback, useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useEffect, useMemo, useState } from "react";
import { initUtils } from '@telegram-apps/sdk';
import { generateImage, getUserAvatarUrl } from "@/app/constants";
import { useGlobalState } from "@/context/GlobalStateContext";
import useAxiosPost from "@/hooks/useAxios";
import { datalist } from "framer-motion/m";

export const Tips: FC<any> = ({ color, className, ...rest }) => {
    const lp = useLaunchParams();
    const initData = useInitData();
    const utils = initUtils();
    const { userData } = useGlobalState(); // Global state'ten veriyi al
    const [cursor, setCursor] = useState<any>(null);
    const { data, error, loading, postData } = useAxiosPost(`/maggoo/tip`);
    const [tips, setTips] = useState<any>([]);
    const hapticFeedback = initHapticFeedback();

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
                setTips(prevUsers => [...prevUsers, ...data]);
                //@ts-ignore
                setCursor(0);

                //@ts-ignore
                console.log("veri geldi", data)

            }


        }
    }, [loading])



    const TipCard = (tipData: any) => {

        const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
        const [modalPlacement, setModalPlacement] = useState("auto");

        const { data, error, loading, postData } = useAxiosPost('/maggoo/tip/claim');
        const hapticFeedback = initHapticFeedback();


        const handleClaim = async (tipInfo: any) => {
            hapticFeedback.impactOccurred('heavy');

            console.log("tipData",tipData.tip)
            let params = {
                user: userData.userInfo.UserID,
                tip: tipData.tip.tip_id
            }
            await postData(params).then(() => {

            })
            onOpen()
        }

        useEffect(() => {
            console.log("TIP DATA", tipData.tip)
        }, [])


        const isClaimed = (claims: any): boolean => {
            // Check if claims is defined and is an array
            if (!claims || !Array.isArray(claims)) {
                return false;
            }

            // Check if userId exists in the claims array
            return claims.includes(userData.userInfo.UserID);
        }
        useEffect(() => {
            if (data) {


            }

        }, [data])

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
                                                <div className="w-full text-center text-3xl !text-primary-300 flex items-center justify-center">
                                                    <span>
                                                        {error ? error.response.data : data}

                                                    </span>
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
                            name={tipData.tip.NickName}
                            description={(
                                <Link className="text-primary-300"
                                    href={`https://t.me/${tipData.tip.UserName ? tipData.tip.UserName : "maggooio"} `} size="sm" isExternal>
                                    @{tipData.tip.UserName ? tipData.tip.UserName : "maggooio"}
                                </Link>
                            )}
                            avatarProps={{
                                src: getUserAvatarUrl(tipData.tip.UserID)
                            }}
                        />

                        <Button isLoading={loading} isDisabled={isClaimed(tipData.tip.claimed_users)} onClick={() => {
                            handleClaim(tipData.tip)
                        }} className={isClaimed(tipData.tip.claimed_users) ? "btn-claimed" : "btn-primary" + "  py-2 text-lg"}>
                            {tipData.tip.amount} {tipData.tip.asset}
                        </Button>
                    </div>
                </div>
            </>
        );
    };




    const handleCopyToClipboard = async () => {
        let text = `https://t.me/maggooio`
        try {
            await navigator.clipboard.writeText(text);
            //setCopySuccess("Text copied to clipboard!");
        } catch (err) {
            //setCopySuccess("Failed to copy text.");
        }
    }

    const handleShare = () => {
        utils.openLink("https://t.me/maggooio")

    }

    return (
        <div className={`w-full h-full flex gap-2 flex-col ${className}`} {...rest}>

            <ScrollShadow hideScrollBar className="w-full" style={{ height: `calc(100vh - 470px)` }} >

                <div className="w-full h-full flex flex-col gap-2" style={{ color }}>
                    {
                        loading && <div className="w-full h-screen flex items-center justify-center">
                            <Spinner classNames={{
                                label: "text-3xl"
                            }} label="Loading... Please Wait!" color="warning" labelColor="warning" />
                        </div>
                    }
                    {
                        tips.map((tipItem: any, index: number) => (
                            <TipCard
                                key={`tipItem${tipItem.id}${index}`}
                                tip={tipItem}
                            />
                        ))
                    }
                    {
                        !loading && tips.length == 0 && <div className="w-full h-full flex flex-col gap-2 text-center items-center justify-center overflow-x-none">
                            <Button onClick={() => {
                                hapticFeedback.impactOccurred("heavy")
                                loadMoreUsers()
                            }} isLoading={loading} variant="light" color="default" className="w-full h-full flex flex-col gap-2 text-center items-center justify-center p-2">
                                <Image width={130} src={getUserAvatarUrl(userData.userInfo.UserID)} />
                                <div className="w-full text-center overflow-hidden">
                                    <span className="text-white text-md sm:text-center sm:text-xs whitespace-normal">
                                        There are no active TIPs right now. Please join the MAGGOO Telegram channel and use the TIP command. MAGGOO will automatically distribute the TIPs. Each TIP is only valid for 3 minutes. The fastest one wins!
                                    </span>
                                </div>

                            </Button>


                        </div>
                    }



                </div>
            </ScrollShadow>
            <div className="w-full flex flex-row gap-2 rounded-lg">

                <Button onClick={() => {
                    handleShare()
                }} className=" btn-primary  w-full py-6 text-2xl">
                    Join Maggoo Telegram
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