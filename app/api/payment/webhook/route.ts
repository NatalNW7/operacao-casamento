import { NextRequest, NextResponse } from "next/server"
import PaymentService from "@/domain/payment-service"
import { eventPaid } from "@/domain/models";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('webhookSecret');
    if(secret !== process.env.WEBHOOK_SECRET){
        return NextResponse.json({ error: "Access Denied"}, { status: 401 });
    }
    const event: eventPaid = await request.json();
    const paymentService = new PaymentService();

    await paymentService.updatePaymentStatus(event.data.pixQrCode.id, event.data.pixQrCode.status);
    await sendEmail(event);

    return NextResponse.json({message: "ok"});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}