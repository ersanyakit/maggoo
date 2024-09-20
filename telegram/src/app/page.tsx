'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';

import { Link } from '@/components/Link/Link';

import tonSvg from './_assets/ton.svg';
import { Intro } from '@/components/Maggoo/Intro';
import { Tab, Tabs } from "@nextui-org/react";
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <>
    <div className='main'>
      <Header/>
      <div className="flex fixed flex-wrap gap-4">
        <Tabs
          fullWidth
          color="warning"
          variant='light'
          placement='bottom'
          className='w-screen h-screen'
          classNames={{
            tabList: "gap-2 w-full relative rounded-none  border-divider",


            tab: "h-50 m-2"
          }}
          size="sm"
          radius='lg'
          aria-label="Options">

          <Tab key="referrals" title={
            <div className='w-full flex flex-col gap-2 items-center justify-center'>
              <span translate='no' className="material-symbols-outlined">
                diversity_1
              </span>
              <span className='text-xs'>Referrals</span>

            </div>
          }>
            <div className='w-screen h-[calc(100vh-180px)]'>
              upgrade
            </div>



          </Tab>

          <Tab key="eggsandboxes"
            title={
              <div className='w-full flex flex-col gap-2 items-center justify-center'>
                <span translate='no' className="material-symbols-outlined">
                  stadia_controller
                </span>
                <span className='text-xs'>Eggs & Boxes</span>

              </div>
            }>
            <div className='w-screen h-[calc(100vh-180px)]'>
              upgrade
            </div>

          </Tab>

          <Tab key="marketplace" title={
            <div className='w-full flex flex-col gap-2 items-center justify-center'>
              <span translate='no' className="material-symbols-outlined">
                storefront
              </span>
              <span>Market</span>

            </div>
          }>
            <div className='w-screen h-[calc(100vh-180px)]'>
              upgrade
            </div>


          </Tab>

          <Tab key="upgrade" title={
            <div className='w-full flex flex-col gap-2 items-center justify-center'>
              <span translate='no' className="material-symbols-outlined">
                extension
              </span>
              <span>Upgrade</span>

            </div>
          }>
            <div className='w-screen h-[calc(100vh-180px)]'>
              upgrade
            </div>


          </Tab>

          <Tab key="wallet" title={
            <div className='w-full flex flex-col gap-2 items-center justify-center'>
              <span translate='no' className="material-symbols-outlined">
                account_balance_wallet
              </span>
              <span>Wallet</span>

            </div>
          }>

            <div className='w-screen h-[calc(100vh-180px)]'>
              <List>
                <Section
                  header='Features'
                  footer='You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects'
                >
                  <Link href='/ton-connect'>
                    <Cell
                      before={<Image src={tonSvg.src} style={{ backgroundColor: '#007AFF' }} />}
                      subtitle='Connect your TON wallet'
                    >
                      TON Connect
                    </Cell>
                  </Link>
                </Section>
                <Section
                  header='Application Launch Data'
                  footer='These pages help developer to learn more about current launch information'
                >
                  <Link href='/init-data'>
                    <Cell subtitle='User data, chat information, technical data'>Init Data</Cell>
                  </Link>
                  <Link href='/launch-params'>
                    <Cell subtitle='Platform identifier, Mini Apps version, etc.'>Launch Parameters</Cell>
                  </Link>
                  <Link href='/theme-params'>
                    <Cell subtitle='Telegram application palette information'>Theme Parameters</Cell>
                  </Link>
                </Section>
              </List>
            </div>




          </Tab>
        </Tabs>
      </div>
      
   
    </div>
    <div className='footer'>
    
    </div>

    </>
  );
}
