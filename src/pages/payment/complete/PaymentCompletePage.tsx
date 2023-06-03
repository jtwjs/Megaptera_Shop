import { useLocation, Navigate, Link } from "react-router-dom";

import PATH from "@/constants/path";

export default function PaymentCompletePage() {
  const { state } = useLocation();

  return state?.completeFlag ? (
    <section>
      <h1>주문이 완료되었습니다.</h1>
      <p>
        <Link to={PATH.ORDERS}>주문 목록 확인</Link>
      </p>
    </section>
  ) : (
    <Navigate to={PATH.ROOT} />
  );
}
