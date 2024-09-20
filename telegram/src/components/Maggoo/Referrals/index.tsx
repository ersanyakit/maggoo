import { Avatar, Button, Link, ScrollShadow, User } from "@nextui-org/react";
import { FC } from "react";

export const Referrals: FC<any> = ({ color, className, ...rest }) => {

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
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                    }}
                    />
            </div>
        );
    };

    return (
        <div className={`w-full h-full flex gap-2 flex-col ${className}`} {...rest}>

            <ScrollShadow hideScrollBar className="w-full h-[400px]">

                <div className="w-full flex flex-col gap-2" style={{ color }}>
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                    <ReferralCard name={"Ersan"} />
                </div>
            </ScrollShadow>
            <div className="w-full flex flex-row gap-2 rounded-lg">

                <Button className=" btn-primary  w-full py-6 text-2xl">
                    Invite Friends
                </Button>

                <Button isIconOnly className=" btn-primary p-6 text-2xl">

                    <span translate="no" className="material-symbols-outlined">
                        content_copy
                    </span>
                </Button>

            </div>
        </div>
    );
};