import { useRef, useState, useEffect } from "react";

import type { Trigger } from "@/types/common";

import * as S from "./AddressSearch.styled";

interface AddressSearchProps {
  trigger: Trigger;
  changeAddress: (address: string, postalCode: string) => void;
}

export default function AddressSearch({
  trigger,
  changeAddress,
}: AddressSearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      new daum.Postcode({
        oncomplete(data) {
          const { address, zonecode: postalCode } = data;
          changeAddress(address, postalCode);
          setIsOpen(false);
        },
        width: "100%",
        height: "100%",
      }).embed(containerRef.current);
    }
  }, [isOpen, changeAddress]);

  return (
    <>
      {trigger({ isOpen, handleToggle })}
      {isOpen && (
        <S.AddressSearch id="address-search-container" onClick={close}>
          <div ref={containerRef} />
        </S.AddressSearch>
      )}
    </>
  );
}
