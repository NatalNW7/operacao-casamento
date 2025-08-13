import PaymentService from "@/domain/payment-service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {    
    const paymentService = new PaymentService();
    const qtdTickets = await paymentService.getTotalTickets();

    return NextResponse.json( qtdTickets );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}