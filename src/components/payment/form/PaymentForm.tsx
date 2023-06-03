import { TextInput, AddressSearch, Button } from "@/components/common";
import usePaymentFormStore from "@/hooks/usePaymentFormStore";

import * as S from "./PaymentForm.styled";

export default function PaymentForm() {
  const {
    receiver,
    handleChangeAddress,
    handleChangeName,
    handleChangeAddressDetail,
    handleChangePhoneNumber,
  } = usePaymentFormStore();

  return (
    <S.PaymentForm>
      <h3>받는 사람</h3>
      <TextInput
        id="name"
        label="이름"
        placeholder="받는 분 이름"
        value={receiver.name}
        onChange={handleChangeName}
      />
      <S.PostalCodeField>
        <TextInput
          id="postCode"
          label="우편번호"
          placeholder="우편번호"
          value={receiver.postalCode}
          readOnly
        />
        <AddressSearch
          trigger={({ isOpen, handleToggle }) => (
            <Button
              aria-haspopup="true"
              aria-pressed={isOpen}
              label="우편번호 검색"
              onClick={handleToggle}
            />
          )}
          changeAddress={handleChangeAddress}
        />
      </S.PostalCodeField>
      <TextInput id="address" label="주소" value={receiver.address1} readOnly />
      <TextInput
        id="detail"
        label="상세 주소"
        placeholder="상세 주소를 입력하세요"
        value={receiver.address2}
        onChange={handleChangeAddressDetail}
      />
      <TextInput
        id="tel"
        label="전화번호"
        type="tel"
        value={receiver.phoneNumber}
        onChange={handleChangePhoneNumber}
      />
    </S.PaymentForm>
  );
}
