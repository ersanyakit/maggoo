import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { getMintHistory } from "@/utils/web3";
import NFTSlider from "./Slider";

interface SuccessModalProps {
  isOpen: boolean;
  desc: string;
  address?: any;
  onClose: () => void;
}

const OpenEggModal: React.FC<SuccessModalProps> = ({
  isOpen,
  desc,
  address,
  onClose,
}) => {
  const [calledHistory, setCalledHistory] = useState<any>();

  useEffect(() => {
    const fetchUserMintHistory = async () => {
      try {
        const history: any = await getMintHistory(address);

        setCalledHistory(history);
      } catch (error) {}
    };
    fetchUserMintHistory();
  }, [address, isOpen]);

  const [sortedHistorys, setSortedHistorys] = useState<any>();

  const sortedHistory = async () => {
    try {
      if (!calledHistory) {
        return;
      }

      const addingTimestamp = 5; // 5 saniyelik fark

      // 1. Veriyi `blockTimestamp`e göre büyükten küçüğe sıralama
      const sortedData = calledHistory.sort(
        (a: any, b: any) =>
          Number(b.blockTimestamp) +
          addingTimestamp -
          (Number(a.blockTimestamp) + addingTimestamp)
      );

      // 2. En büyük `blockTimestamp`e sahip olanları bulma
      const maxTimestamp =
        Number(sortedData[0].blockTimestamp) + addingTimestamp;
      const maxTimestampData = sortedData.filter(
        (item: any) =>
          Number(item.blockTimestamp) + addingTimestamp === maxTimestamp
      );

      setSortedHistorys(maxTimestampData);
    } catch (error) {
      console.error("Error sorting history:", error);
    }
  };

  useEffect(() => {
    sortedHistory();
  }, [address, isOpen, calledHistory]);

  return (
    <Modal
      placement="center"
      size="4xl"
      isOpen={isOpen}
      backdrop="opaque"
      onClose={onClose}
      classNames={{
        body: "",
        base: "bg-header-bg",
        header: "",
        footer: "",
      }}
    >
      <ModalContent>
        <>
          {calledHistory && sortedHistorys && (
            <>
              <ModalBody className="flex items-center text-center">
                <div className="w-full h-full flex flex-col   gap-5 py-5 items-center">
                  <div className="w-full flex items-center justify-center">
                    <p className="text-2xl">{`YOU HAVE RECEIVED THIS ITEM(s)`}</p>
                  </div>
                  <>
                    {calledHistory && sortedHistorys && (
                      <>
                        <NFTSlider items={sortedHistorys} />
                      </>
                    )}
                  </>
                </div>
              </ModalBody>
            </>
          )}
        </>
      </ModalContent>
    </Modal>
  );
};

export default OpenEggModal;
