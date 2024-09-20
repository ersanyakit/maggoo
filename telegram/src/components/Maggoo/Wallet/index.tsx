import { FC, useEffect } from "react";
import Image from "next/image";
import { Avatar, Button, Card, CardBody, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { DEPOSIT_RECEIVER_ADDRESS } from "@/app/constants";
import { useUtils } from '@telegram-apps/sdk-react';
import { DisplayData } from "@/components/DisplayData/DisplayData";
import { List, Section, Cell, Navigation, Title, Placeholder } from "@telegram-apps/telegram-ui";
import { address } from "framer-motion/client";
import { platform } from "os";
import { features } from "process";

export const Wallet: FC<any> = ({ color, className, ...rest }) => {

    const [tonConnectUI, setOptions] = useTonConnectUI();
    const wallet = useTonWallet();
    const utils = useUtils();


 
    

   
    return (
    <>
  <Tabs classNames={{
    tabList:"backdrop-blur-sm bg-white/10",
    tabContent:"text-white"
  }} fullWidth aria-label="Options">
        <Tab key="wallet" title="WALLET">
          <Card className="backdrop-blur-sm bg-transparent">
            <CardBody>
            <ScrollShadow hideScrollBar className="w-full h-[400px]">
       
       {wallet ? 
            <List>
      {'imageUrl' in wallet && (
        <>
          <Section>
            <Cell
              before={
                <Avatar src={wallet.imageUrl} alt='Provider logo'/>
              }
              after={<Navigation>About wallet</Navigation>}
              subtitle={wallet.appName}
              onClick={(e) => {
                e.preventDefault();
                utils.openLink(wallet.aboutUrl);
              }}
            >
              <Title level='3'>{wallet.name}</Title>
            </Cell>
          </Section>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
          <TonConnectButton className='w-full ton-connect-page__button-connected'/>
          </div>
        </>
      )}
      <DisplayData
        header='Account'
        rows={[
          { title: 'Address', value: wallet.account.address },
          { title: 'Chain', value: wallet.account.chain },
          { title: 'Public Key', value: wallet.account.publicKey },
        ]}
      />
      <DisplayData
        header='Device'
        rows={[
          { title: 'App Name', value: wallet.device.appName },
          { title: 'App Version', value: wallet.device.appVersion },
          { title: 'Max Protocol Version', value: wallet.device.maxProtocolVersion },
          { title: 'Platform', value: wallet.device.platform },
          {
            title: 'Features',
            value: wallet.device.features
              .map(f => typeof f === 'object' ? f.name : undefined)
              .filter(v => v)
              .join(', '),
          },
        ]}
      />
    </List>  : 
    <>
     <Placeholder
        className='ton-connect-page__placeholder'
        header='TON Connect'
        description={
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <span>
              To display the data related to the TON Connect, it is required to connect your wallet
            </span>
            <TonConnectButton className='ton-connect-page__button'/>
          </div>
        }
      />
      </>
    }    
    </ScrollShadow>   
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>

      
    </>
)}