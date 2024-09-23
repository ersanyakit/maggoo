import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Image, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { initBackButton, initHapticFeedback, useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useMemo } from "react";
import { initUtils } from '@telegram-apps/sdk';
import { getUserAvatarUrl } from "@/app/constants"; // Varsayalım avatar URL fonksiyonu burada tanımlı
import { Players } from "../Maggoo/Players";

export const Header: FC<any> = ({ color, className, ...rest }) => {
    const [backButton] = initBackButton();
    const hapticFeedback = initHapticFeedback();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const lp = useLaunchParams();
    const initData = useInitData();
    const utils = initUtils();

    const userRows = useMemo<any | undefined>(() => {
        return initData && initData.user ? initData.user : undefined;
    }, [initData]);

    const avatarUrl = getUserAvatarUrl(userRows?.id) 

    return (
        <>

<Modal size="full" 
      className="bg-transparent backdrop-blur-md "
      isOpen={isOpen}
      placement={"auto"}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">Maggoo Players</ModalHeader>
              <ModalBody>
                    <Players/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      
            <Navbar className="bg-transparent" isBlurred={false}>
                <NavbarBrand>
                    <Button radius="full" isIconOnly onClick={()=>{
                        hapticFeedback.impactOccurred("heavy")
                        onOpen()
                    }}>                   
                    <Image width={48} height={48} src="/mag.svg" />
                    </Button>
                </NavbarBrand>
                <NavbarContent justify="center">
                    <Image width={200} src="/logo.webp" />
                </NavbarContent>
                <NavbarContent justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name={userRows ? userRows.first_name : "User"}
                                size="sm"
                                src={avatarUrl}  // Kullanıcının avatarı
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{userRows ? userRows.username : "zoey@example.com"}</p>
                            </DropdownItem>
                        
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="maggoocommunity">Maggoo Community</DropdownItem>
                            <DropdownItem key="maggooweb">Maggoo Website</DropdownItem>
                            <DropdownItem key="maggootwitter">Follow Us</DropdownItem>


                            <DropdownItem onClick={()=>{

                                }} key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </>
    );
};