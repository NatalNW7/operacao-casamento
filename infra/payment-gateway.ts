import AbacatePay from "abacatepay-nodejs-sdk"

export default function PaymentGateway(){
    const apiKey = process.env.PAYMENT_GATEWAY_KEY;

    if (!apiKey) {
        throw new Error("PAYMENT_GATEWAY_KEY environment variable is not set.");
    }

    return AbacatePay(apiKey);
}