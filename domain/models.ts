export interface User {
    name: string
    whatsapp: string
    email: string
    cpf: string
}
export interface UserDTO {
    id: number
    name: string
    whatsapp: string
    email: string
    cpf: string
}

export interface Product {
    id: string
    name: string
    bonus: number
    quantity: number
    price: number
    total: number
}

export interface ProductDTO {
    id: string
    name: string
    price: number
}

export interface Payment {
    id: string
    userId: number
    productId: string
    paidAmount: number
    quantityWithBonus: number
    devMode: boolean
    status: string
}

export interface PaymentInfo {
    id: string
    user: User
    product: ProductDTO
    paidAmount: number
    quantityWithBonus: number
    devMode: boolean
    status: string
}
