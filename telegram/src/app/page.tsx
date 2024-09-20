'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';

import { Link } from '@/components/Link/Link';

import tonSvg from './_assets/ton.svg';
import { Intro } from '@/components/Maggoo/Intro';
import { Tab, Tabs } from "@nextui-org/react";

export default function Home() {
  return (
    <>

      <div className="w-screen h-screen fixed">
        <Tabs
          fullWidth
          color="warning"
          variant='bordered'
          placement='bottom'
          className='w-screen h-screen'
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",

      
            tab:"h-50 m-2"
          }}
          size="sm"
          radius='lg'
          aria-label="Options">

          <Tab key="referrals" title={
            <div className='w-full flex flex-col gap-2 items-center justify-center'>
              <span translate='no' className="material-symbols-outlined">
                diversity_1
              </span>
              <span>Referrals</span>

            </div>
          }>
                 <div className='w-screen h-[calc(100vh-110px)] bg-red-200'>
              upgrade
            </div>



          </Tab>

          <Tab key="eggsandboxes" 
          title={
            <div className='w-full flex flex-col gap-2 items-center justify-center'>
              <span translate='no' className="material-symbols-outlined">
              stadia_controller
              </span>
              <span>Eggs & Boxes</span>

            </div>
          }>
         <div className='w-screen h-[calc(100vh-110px)] bg-red-200'>
              upgrade
            </div>

          </Tab>

          <Tab key="marketplace" title={
            <div className='w-full flex flex-col gap-2 items-center justify-center'>
              <span translate='no' className="material-symbols-outlined">
              storefront
              </span>
              <span>Marketplace</span>

            </div>
          }>
         <div className='w-screen h-[calc(100vh-110px)] bg-red-200'>
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
            <div className='w-screen h-[calc(100vh-110px)] bg-red-200'>
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

<div className='w-screen h-[calc(100vh-110px)] bg-red-200'>
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




    </>
  );
}
