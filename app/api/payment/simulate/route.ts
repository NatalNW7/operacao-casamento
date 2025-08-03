import { NextRequest, NextResponse } from "next/server"
import PaymentService from "@/domain/payment-service"

export async function POST(request: NextRequest) {
  try {
    const paymentId = request.nextUrl.searchParams.get('paymentId')
    if (!paymentId) {
        return NextResponse.json(
        { error: "paymentId is required" },
        { status: 400 }
      )
    }

    const paymentService = new PaymentService()
    const response = await paymentService.paymentGateway.pixQrCode.simulatePayment({id: paymentId})

    return NextResponse.json( response )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const paymentService = new PaymentService()
    const response = await paymentService.getPayments()
    
    return NextResponse.json( response )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}