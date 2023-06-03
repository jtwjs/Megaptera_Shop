export interface Iamport {
  init: (merchantId = "") => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback
  ) => void;
}

declare global {
  interface Window {
    IMP: Iamport;
  }
}
