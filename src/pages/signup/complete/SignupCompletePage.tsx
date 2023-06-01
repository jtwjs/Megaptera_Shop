import { useLocation, Navigate } from "react-router-dom";

import PATH from "@/constants/path";

export default function SignupCompletePage() {
  const { state } = useLocation();

  return state?.signupFlag ? (
    <section>
      <h1>Signup Complete</h1>
    </section>
  ) : (
    <Navigate to={PATH.ROOT} />
  );
}
