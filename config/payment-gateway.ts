import MercadoPagoAPI from "@/lib/mercadopago-api";

export default function PaymentGateway(){
    const apiKey = process.env.PAYMENT_GATEWAY_KEY;
    if (!apiKey) {
        throw new Error("PAYMENT_GATEWAY_KEY environment variable is not set.");
    }

    return new MercadoPagoAPI(apiKey);
}