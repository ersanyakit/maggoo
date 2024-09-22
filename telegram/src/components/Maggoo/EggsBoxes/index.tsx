import { FC, useEffect, useMemo } from "react";
import { Button, Card, CardBody, Modal, ModalBody, ModalContent, Image, ModalFooter, ModalHeader, Spinner, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { DEPOSIT_RECEIVER_ADDRESS, generateImage } from "@/app/constants";
import { useInitData, useLaunchParams, useUtils } from '@telegram-apps/sdk-react';
import useAxiosPost from "@/hooks/useAxios";
import { useGlobalState } from "@/context/GlobalStateContext";
import { data } from "framer-motion/client";
import { BODY_TOKEN_ID_START, getImageName, WEARABLE_TOKEN_ID_START } from "@/app/utils/constants";
import Maggoo from "../Maggoo";

export const EggsAndBoxes: FC<any> = ({ color, className, ...rest }) => {

    const [tonConnectUI, setOptions] = useTonConnectUI();
    const wallet = useTonWallet();
    const utils = useUtils();

    const { postData: openEgg, data: eggData, error: eggError, loading: eggLoading } = useAxiosPost('/maggoo/egg');
    const { postData: openBox, data: boxData, error: boxError, loading: boxLoading } = useAxiosPost('/maggoo/box');
    const { userData } = useGlobalState(); // Global state'ten veriyi al

    const lp = useLaunchParams();
    const initData = useInitData();

    const { isOpen: isOpenModelEgg, onOpen: onOpenModelEgg, onClose: onCloseModelEgg } = useDisclosure();
    const { isOpen: isOpenModelBox, onOpen: onOpenModelBox, onClose: onCloseModelBox } = useDisclosure();
    const { isOpen: isOpenModelError, onOpen: onOpenModelError, onClose: onCloseModelError } = useDisclosure();



    useEffect(() => {

        if (wallet) {
            const {
                account: { chain, publicKey, address },
                device: {
                    appName,
                    appVersion,
                    maxProtocolVersion,
                    platform,
                    features,
                },
            } = wallet;
        }

    }, [wallet])

    const handleOpenEgg = async () => {

        let params = {
            user: userData.userInfo.UserID
        }
        try {
            const response = await openEgg(params);
            if (eggError) {
                onOpenModelError()
            } else {
                onOpenModelEgg()
            }
            console.log('Egg opened:', eggData);
        } catch (error) {
            console.error('Error opening egg:', error);
        }


    }



    const handleOpenMysteriosBox = async () => {
        let params = {
            user: userData.userInfo.UserID
        }
        try {
            const response = await openBox(params); // Parametreleri burada geçiriyoruz
            console.log('Box opened:', boxData);
            if (boxError) {
              //  onOpenModelError()
            } else {
                onOpenModelBox()
            }
            console.log(boxData, getImageName(false, (boxData as any).tokenId, (boxData as any).wearableId))
            onOpenModelBox()
        } catch (error) {
            console.error('Error opening box:', error);
        }

    }
    return (
        <>

            <Modal
                size="full"
                className="bg-transparent backdrop-blur-sm "
                isOpen={isOpenModelError}
                placement={"auto"}
                onOpenChange={onOpenModelError}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-white">Error</ModalHeader>
                            <ModalBody>
                                <div className="w-full h-full p-2 gap-2 flex items-center justify-center">

                                    <div className="w-full flex flex-col gap-5 p-2 items-center text-center justify-center relative">

                                        {
                                            eggError && <span className=" text-3xl text-primary-300  w-full"> {eggError.response.data}</span>
                                        }
                                        {
                                            boxError && <span className="text-primary-300  text-3xl w-full"> {boxError.response.data}</span>
                                        }
                                    </div>


                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="btn-primary w-full py-6 text-2xl" onPress={onCloseModelError}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <Modal
                size="full"
                className="bg-transparent backdrop-blur-sm "
                isOpen={isOpenModelEgg}
                placement={"auto"}
                onOpenChange={onOpenModelEgg}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-white">Maggoo Egg</ModalHeader>
                            <ModalBody>
                                <div className="w-full h-full p-2 gap-2 flex items-center justify-center">

                                <div className={(eggLoading ? "" : "bg-white/90") + " w-full h-full p-2 gap-2 flex items-center justify-center rounded-lg"}>

                                        {
                                            eggLoading ?     <Image
                                            loading="eager"
                                            src="/eggs/egg_open.png"
                                            alt="egg"
                                            width={400}
                                            height={400}
                                            className="bg-transparent"
                                            /> :  <Maggoo isMarketItem={true} tokenId={(eggData as any).tokenId * BODY_TOKEN_ID_START + 1} />
                                        }

                                 
                                    </div>


                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="btn-primary w-full py-6 text-2xl" onPress={onCloseModelEgg}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <Modal
                size="full"
                className="bg-transparent backdrop-blur-sm "
                isOpen={isOpenModelBox}
                placement={"auto"}
                onOpenChange={onOpenModelBox}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-white">MysteryBox</ModalHeader>
                            <ModalBody>
                                <div className={(boxLoading ? "" : "bg-white/90") + " w-full h-full p-2 gap-2 flex items-center justify-center rounded-lg"}>

                                    {
                                        boxLoading ? <Image
                                        loading="eager"
                                        src="/boxes/box_open.png"
                                        alt="egg"
                                        width={400}
                                        height={400}
                                        className="relative"
                                    /> :  <Maggoo isMarketItem={true} tokenId={(boxData as any).tokenId * WEARABLE_TOKEN_ID_START + (boxData as any).wearableId} />

                                    }
                                    
                                  
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="btn-primary w-full py-6 text-2xl" onPress={onCloseModelBox}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Tabs classNames={{
                tabList: "backdrop-blur-sm bg-white/10",
                cursor: "w-full border border-2 border-primary-100 bg-primary-300 text-white",
                tabContent: "group-data-[selected=true]:text-[#fff] text-white/50",
            }} fullWidth aria-label="Options">
                <Tab key="maggooEgg" title="MAGGOO EGG">
                    <Card style={{ height: `calc(100vh - 380px)` }} className="backdrop-blur-sm bg-transparent">
                        <CardBody>
                            <div className="w-full h-full p-2 flex-col border-2 border-white/30 flex justify-around items-center rounded-xl">

                                <div className="w-full flex items-center justify-center flex-grow-2  flex-shrink-0">

                                    <Image
                                        src={"/eggs/egg_default.png"}
                                        alt="egg"
                                        width={160}
                                        height={260}
                                        className="bg-transparent w-full"
                                    />

                                </div>
                                <div className="w-full">

                                    <Button isLoading={eggLoading} isDisabled={eggLoading} onClick={() => {
                                        handleOpenEgg()
                                    }} className=" btn-primary  w-full py-6 text-2xl">
                                        <p>Maggoo’s Hidden Treasure</p>
                                    </Button>

                                </div>

                                <div className="w-full">

                                    <p className="text-c-primary text-sm sm:text-center  sm:text-xs">
                                        Maggoo Egg contains various Maggoos with certain hash powers
                                    </p>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="music" title="MYSTERYBOX">
                    <Card style={{ height: `calc(100vh - 380px)` }} className="backdrop-blur-sm bg-transparent">
                        <CardBody>
                            <div className="w-full h-full p-2 flex flex-col border-2 border-white/30 flex justify-around items-center rounded-xl">

                                <div className="w-full flex items-center justify-center flex-grow-2  flex-shrink-0">

                                    <Image
                                        src={"/boxes/box_default.png"}
                                        alt="boxes"
                                        width={150}
                                        height={260}
                                        className="bg-transparent w-full"
                                    />
                                </div>


                                <div className="w-full">
                                    {
                                        <Button isLoading={boxLoading} isDisabled={boxLoading} onClick={() => {
                                            handleOpenMysteriosBox()
                                        }} className=" btn-primary  w-full py-6 text-2xl">
                                            <p>Maggoo's Mystery Vault</p>
                                        </Button>

                                    }
                                </div>
                                <div className="w-full">


                                    <p className="text-c-primary text-sm sm:text-center  sm:text-xs flex-grow flex-shrink">
                                        Mystery Box contains various items with certain hash powers
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>


        </>
    )
}

