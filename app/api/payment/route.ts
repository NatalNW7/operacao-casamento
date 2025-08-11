import { NextRequest, NextResponse } from "next/server"
import PaymentService from "@/domain/payment-service"
import { Product, User } from "@/domain/models"

export async function POST(request: NextRequest) {
  try {
    // const isQrCode = request.nextUrl.searchParams.get('type') === 'qrcode'
    const body = await request.json()
    const { user, product }: { user: User; product: Product } = body
    
    if (!user || !product) {
      return NextResponse.json(
        { error: "Missing user or product info" },
        { status: 400 }
      )
    }
    
    const paymentService = new PaymentService()
    const pixQrCode = await paymentService.createPaymentWithQrCode(user, product)
    await paymentService.savePayment(
      {
        id: pixQrCode.id.toString(),
        status: pixQrCode.status,
        amount: pixQrCode.transaction_amount
      }, 
      user, 
      product
    )
    return NextResponse.json( pixQrCode )
  } catch (error) {
    console.error("Payment creation failed:", error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const paymentId = request.nextUrl.searchParams.get('paymentId')
    if (!paymentId) {
        return NextResponse.json(
        { error: "paymentId is required" },
        { status: 400 }
      )
    }
    
    const paymentService = new PaymentService()
    const billing = await paymentService.checkPaymentStatus(parseInt(paymentId))

    return NextResponse.json( billing )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}