type Product = {
  name: string;
  price: number;
};

interface PaymentRequest {
  merchantId: string;
  product: Product;
}

interface PaymentResponse {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
}

export default class PaymentService {
  instance = window.IMP;

  async requestPayment({ merchantId, product }: PaymentRequest): Promise<{
    merchantId: string;
    transactionId: string;
  }> {
    return new Promise((resolve, reject) => {
      this.instance.request_pay(
        {
          pg: process.env.PORTONE_PG_CODE,
          pay_method: "card",
          merchant_uid: merchantId,
          name: product.name,
          amount: product.price,
        },
        (response: PaymentResponse) => {
          if (response.success) {
            resolve({
              merchantId: response.merchant_uid,
              transactionId: response.imp_uid ?? "",
            });
          } else {
            reject(Error(response.error_msg));
          }
        }
      );
    });
  }
}

export const paymentService = new PaymentService();
