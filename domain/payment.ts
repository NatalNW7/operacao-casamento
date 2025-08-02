import {Product, User} from './models'
import PaymentGateway from '@/config/payment-gateway'

export default class PaymentService {
    paymentGateway = PaymentGateway()

    async createPaymentWithQrCode(user: User, product: Product) {
        const pixQrCode = await this.paymentGateway.pixQrCode.create({
            amount: this.convertPriceToCents(product.total),
            expiresIn: 300, // 5 minutes
            description: `Compra de rifa ${product.name}`,
            customer: {
                name: user.name,
                cellphone: user.whatsapp,
                email: user.email,
                taxId: user.cpf,
            },
        })

        return pixQrCode
    }

    // private calculateTotalWithBonus(product: Product){
    //     const quantityTotal = this.calculateTotalQuantity(product)
    //     const bonusPrice = product.price*product.bonus
        
    // }

    async createPayment(user: User, product: Product) {
        const billing = await this.paymentGateway.billing.create({
            frequency: 'ONE_TIME',
            methods: ['PIX'],
            products: [
                {
                    externalId: product.id,
                    name: product.name,
                    description: `Compra de rifa ${product.name}`,
                    price: this.convertPriceToCents(product.price),
                    quantity: this.calculateTotalQuantity(product),
                },
            ],
            returnUrl: 'http://localhost:3000/',
            completionUrl: 'http://localhost:3000/payment/success',
            customer: {
                name: user.name,
                cellphone: user.whatsapp,
                email: user.email,
                taxId: user.cpf,
            },
        })

        return billing
    }

    private convertPriceToCents(price: number){
        return price * 100
    }

    private calculateTotalQuantity(product: Product){
        return product.bonus + product.quantity
    }
}