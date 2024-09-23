import { FC, useEffect, useMemo } from "react";
import { Button, Card, CardBody, Modal, ModalBody, ModalContent, Image, ModalFooter, ModalHeader, Spinner, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { DEPOSIT_RECEIVER_ADDRESS, generateImage } from "@/app/constants";
import { useInitData, useLaunchParams, useUtils, useHapticFeedback, initHapticFeedback } from "@telegram-apps/sdk-react";
import useAxiosPost from "@/hooks/useAxios";
import { useGlobalState } from "@/context/GlobalStateContext";
import { data } from "framer-motion/client";
import { BODY_TOKEN_ID_START, getImageName, WEARABLE_TOKEN_ID_START } from "@/app/utils/constants";
import Maggoo from "../Maggoo";

export const EggsAndBoxes: FC<any> = ({ color, className, ...rest }) => {

    const [tonConnectUI, setOptions] = useTonConnectUI();
    const wallet = useTonWallet();
    const utils = useUtils();

    const { postData: openEgg, data: eggData, error: eggError, loading: eggLoading } = useAxiosPost("/maggoo/egg");
    const { postData: openBox, data: boxData, error: boxError, loading: boxLoading } = useAxiosPost("/maggoo/box");
    const { userData } = useGlobalState(); // Global state"ten veriyi al

    const lp = useLaunchParams();
    const initData = useInitData();
    const hapticFeedback = initHapticFeedback();

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
        hapticFeedback.impactOccurred('heavy');

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
            console.log("Egg opened:", eggData);
        } catch (error) {
            console.error("Error opening egg:", error);
        }


    }



    const handleOpenMysteriosBox = async () => {
        hapticFeedback.impactOccurred('heavy');

        let params = {
            user: userData.userInfo.UserID
        }
        try {
            const response = await openBox(params); // Parametreleri burada geçiriyoruz
            console.log("Box opened:", boxData);
            if (boxError) {
                onOpenModelError()
            } else {
                onOpenModelBox()
            }
        } catch (error) {
            console.error("Error opening box:", error)
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

                                    <div className={(eggLoading ? "" : eggError ? "" : "bg-white/90") + " w-full h-full p-2 gap-2 flex text-center items-center justify-center rounded-lg"}>

                                        {
                                            eggLoading ? <Image
                                                loading="eager"
                                                src="/eggs/egg_open.png"
                                                alt="egg"
                                                width={400}
                                                height={400}
                                                className="bg-transparent"
                                            /> : eggError ?


                                                <span className=" text-3xl text-primary-300  w-full"> {eggError.response.data}</span>

                                                : <Maggoo isMarketItem={true} tokenId={(eggData as any).tokenId * BODY_TOKEN_ID_START + 1} />
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
                                <div className={(boxLoading ? "" : boxError ? "" : "bg-white/90") + " text-center w-full h-full p-2 gap-2 flex items-center justify-center rounded-lg"}>

                                    {
                                        boxLoading ? <Image
                                            loading="eager"
                                            src="/boxes/box_open.png"
                                            alt="egg"
                                            width={400}
                                            height={400}
                                            className="relative"
                                        /> : boxError ?
                                            <span className="text-primary-300  text-3xl w-full"> {boxError.response.data}</span>

                                            : <Maggoo isMarketItem={true} tokenId={(boxData as any).tokenId * WEARABLE_TOKEN_ID_START + (boxData as any).wearableId} />

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

            <Tabs 
             onSelectionChange={()=>{
                hapticFeedback.impactOccurred("soft")
              }}
            classNames={{
                tabList: "backdrop-blur-sm bg-white/10",
                cursor: "w-full border border-2 !border-primary-100 !bg-primary-300 !text-white",
                tabContent: "group-data-[selected=true]:text-[#fff] text-white/50",
            }} fullWidth aria-label="Options">
                <Tab key="maggooEgg" title="MAGGOO EGG">
                    <Card style={{ height: `calc(100vh - 380px)` }} className="backdrop-blur-sm bg-transparent">
                        <CardBody>
                            <div className="w-full h-full p-2 flex-col border-2 border-white/30 flex justify-around items-center rounded-xl">

                                <div className="w-full h-full flex items-center justify-center flex-grow-2  flex-shrink-0">


                                    <Button onClick={() => {
                                        handleOpenEgg()
                                    }} isDisabled={eggLoading} isLoading={eggLoading} variant="light" color="default" className="w-full h-full flex flex-col gap-2 text-center items-center justify-center p-4">

                                        <Image

                                            src={"/eggs/egg_default.png"}
                                            alt="egg"
                                            width={200}
                                            height={260}
                                            className="bg-transparent w-full h-full"
                                        />

                                        <div className="w-full text-center overflow-hidden">
                                            <span className="text-white text-lg sm:text-center sm:text-xs whitespace-normal">
                                                Maggoo Egg contains various Maggoos with certain hash powers
                                            </span>
                                        </div>
                                    </Button>
                                </div>




                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="music" title="MYSTERYBOX">
                    <Card style={{ height: `calc(100vh - 380px)` }} className="backdrop-blur-sm bg-transparent">
                        <CardBody>
                            <div className="w-full h-full p-2 flex flex-col border-2 border-white/30 flex justify-around items-center rounded-xl">

                                <div className="w-full h-full flex items-center justify-center flex-grow-2  flex-shrink-0">


                                <Button onClick={() => {
                                        handleOpenMysteriosBox()
                                    }} isDisabled={boxLoading} isLoading={boxLoading} variant="light" color="default" className="w-full h-full flex flex-col gap-2 text-center items-center justify-center p-4">

                                        <Image

                                            src={"/boxes/box_default.png"}
                                            alt="boxes"
                                            width={200}
                                            height={260}
                                            className="bg-transparent w-full h-full"
                                        />

                                        <div className="w-full text-center overflow-hidden">
                                            <span className="text-white text-lg sm:text-center sm:text-xs whitespace-normal">
                                            Mystery Box contains various items with certain hash powers
                                            </span>
                                        </div>
                                    </Button>
                                </div>

 
                              



                              
                               
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>


        </>
    )
}

