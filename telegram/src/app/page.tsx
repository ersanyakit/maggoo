'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';

import { Link } from '@/components/Link/Link';

import tonSvg from './_assets/ton.svg';
import { Intro } from '@/components/Maggoo/Intro';
import { Tab, Tabs } from "@nextui-org/react";
import { Header } from '@/components/Header';
import { EggsAndBoxes } from '@/components/Maggoo/EggsBoxes';
import { useTonWallet } from '@tonconnect/ui-react';
import { initHapticFeedback, useInitData, useLaunchParams, useUtils } from '@telegram-apps/sdk-react';
import { Wallet } from '@/components/Maggoo/Wallet';
import { useEffect, useMemo } from 'react';
import useAxiosPost from '@/hooks/useAxios';
import { useGlobalState } from '@/context/GlobalStateContext';
import { Market } from '@/components/Maggoo/Market';
import { Earn } from '@/components/Maggoo/Earn';

export default function Home() {

  const wallet = useTonWallet();
  const utils = useUtils();
  const { data, error, loading, postData } = useAxiosPost('/maggoo/sync');
  const { setUserData,userData } = useGlobalState(); // Global state'e erişim

  const hapticFeedback = initHapticFeedback();

  const lp = useLaunchParams();
  const initData = useInitData();

  const userRows = useMemo<any | undefined>(() => {
    return initData && initData.user ? initData : undefined;
  }, [initData]);


  const sendData = async () => {
    console.log(userData)
    const userInfo: any = {
      user: userRows.initData.user,
      referrall: lp.startParam || userRows.initData.startParam || "",
      token: userData ? userData.token : "",
    };
    await postData(userInfo); // userInfo'yu sunucuya gönder
  }
  useEffect(() => {
    if (userRows) {
      sendData()
    }
  }, [userRows, lp.startParam]); // `userRows` veya `lp.startParam` değiştiğinde POST isteği yapılır

  useEffect(() => {
    if(!loading){
      setUserData(data);
    }
  
  }, [loading])

  return (
    <>
      <div className='main'>
        <Header />
        <div className="flex fixed flex-wrap">
          <Tabs
            onSelectionChange={()=>{
              hapticFeedback.impactOccurred("soft")
            }}
            fullWidth
            color="default"
            variant='light'
            placement='bottom'
            className='w-screen h-screen bottom-0'
            classNames={{
              tabList: "gap-2 w-full relative rounded-lg border-divider backdrop-blur-sm bg-white/10",
              cursor: "w-full border border-2 !border-primary-100 !bg-primary-300 !text-white",
              tabContent: "group-data-[selected=true]:text-[#fff] text-white/50",
              tab: "h-50 text-white"
            }}
            size="sm"
            radius='lg'
            aria-label="Options">

            <Tab key="referrals" title={
              <div className='w-full flex flex-col gap-2 items-center justify-center'>
                <span translate='no' className="material-symbols-outlined">
                  diversity_1
                </span>
                <span className='text-xs'>Earn</span>

              </div>
            }>
              <div className='w-screen h-[calc(100vh-180px)]  pt-[150px] p-2'>
                <Earn />
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
              <div className='w-screen h-[calc(100vh-180px)]  pt-[150px] p-2'>
              <EggsAndBoxes />
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
              <div className='w-screen h-[calc(100vh-180px)]  pt-[150px] p-2'>
                <Market />
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

              <div className='w-screen h-[calc(100vh-180px)]  pt-[150px] p-2'>
                <Wallet />
              </div>




            </Tab>
          </Tabs>
        </div>


      </div>

    </>
  );
}
