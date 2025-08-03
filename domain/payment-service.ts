import { CreateBillingResponse, CreatePixQrCodeResponse, IBilling, IPixQrCode } from 'abacatepay-nodejs-sdk/dist/types'
import {Payment, Product, User} from './models'
import PaymentGateway from '@/config/payment-gateway'
import UserService from './user-service'
import database from '@/config/database/database-connection'

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

    async savePayment(
        billing: any, 
        user: User, 
        product: Product
    ){
        const userService = new UserService();
        let userDB = await userService.getOrCreate(user)
        const payment: Payment = {
            id: billing.data.id,
            status: billing.data.status,
            userId: userDB.id,
            productId: product.id,
            devMode: billing.data.devMode,
            paidAmount: billing.data.amount,
            quantityWithBonus: this.calculateTotalQuantity(product),
        }

        try{
            await database.query(
                `INSERT INTO payments ("id", "userId", "productId", "status", "paidAmount", "devMode", "quantityWithBonus") VALUES
                ('${payment.id}',${payment.userId},'${payment.productId}','${payment.status}',${payment.paidAmount},${payment.devMode},${payment.quantityWithBonus});`
            );
        } catch (error){
            throw error;
        }
    }

    async getPayments(): Promise<Payment[]> {
        const payments = await database.query("SELECT * FROM payments;")
        return payments.rows
    }

    async updatePaymentStatus(id: string, status: string) {
        try {
            await database.query(
                `UPDATE payments SET status = '${status}', "updateAt" = NOW() WHERE id = '${id}';`
            )
        } catch (error) {
            throw error
        }
    }
}