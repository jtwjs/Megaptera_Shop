import { useState } from "react";

import usePaymentFormStore from "@/hooks/usePaymentFormStore";
import { useCreateOrder } from "@/services/useOrder";
import { Cart } from "@/types/cart";

import usePaymentService from "./usePaymentService";

export default function usePayment(cart: Cart) {
  const [error, setError] = useState("");

  const { receiver, isValid } = usePaymentFormStore();
  const { mutate: createOrderMutate } = useCreateOrder();

  const { requestPayment } = usePaymentService(cart);

  const handlePayment = async () => {
    setError("");

    try {
      const payment = await requestPayment();
      createOrderMutate({ receiver, payment });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return {
    isValid,
    error,
    handlePayment,
  };
}
