import { NextRequest, NextResponse } from "next/server"
import PaymentService from "@/domain/payment-service"
import { sendEmail } from "@/lib/email";

interface Event {
  action: string,
  api_version: string,
  data: {
    id: number // payment id
  },
  date_created: string,
  id: number, // event id
  live_mode: false,
  type: string,
  user_id: number
}

export async function POST(request: NextRequest) {
  try {
    // const secret = request.nextUrl.searchParams.get('webhookSecret');
    // if(secret !== process.env.WEBHOOK_SECRET){
    //     return NextResponse.json({ error: "Access Denied"}, { status: 401 });
    // }
    const event: Event = await request.json() ;
    if(event.action === "payment.created"){
      return NextResponse.json({message: "ok"});
    }
    const paymentService = new PaymentService();
    const payment = await paymentService.checkPaymentStatus(event.data.id)
    const paymentInfo = await paymentService.updatePaymentStatus(payment.id.toString(), payment.status);

    await sendEmail({
      id: paymentInfo.id,
      amount: paymentInfo.paidAmount,
      status: paymentInfo.status,
      user: {
        email: paymentInfo.user.email,
        name: paymentInfo.user.name
      }
    });

    return NextResponse.json({message: "ok"});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}