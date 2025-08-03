import { getProducts } from "@/domain/product-service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const products = await getProducts()
        return NextResponse.json({
            products
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
        return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
}