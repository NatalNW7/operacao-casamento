import { NextRequest, NextResponse } from "next/server"
import PaymentService from "@/domain/payment"
import { Product, User } from "@/domain/models"

export async function POST(request: NextRequest) {
  try {
    const isQrCode = request.nextUrl.searchParams.get('type') === 'qrcode'
    const body = await request.json()
    const { user, product }: { user: User; product: Product } = body
    
    if (!user || !product) {
      return NextResponse.json(
        { error: "Missing user or product info" },
        { status: 400 }
      )
    }
    
    const paymentService = new PaymentService()
    
    if (isQrCode) {
      const pixQrCode = await paymentService.createPaymentWithQrCode(user, product)
      return NextResponse.json( pixQrCode )
    }

    const billing = await paymentService.createPayment(user, product)

    return NextResponse.json( billing )
  } catch (error) {
    console.error("Payment creation failed:", error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}