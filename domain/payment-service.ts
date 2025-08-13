import {Payment, PaymentInfo, Product, User} from './models'
import PaymentGateway from '@/config/payment-gateway'
import UserService from './user-service'
import database from '@/config/database/database-connection'
import { getProduct } from './product-service'

interface BillingData {
    id: string,
    status: string,
    amount: number,
}

export default class PaymentService {
    paymentGateway = PaymentGateway()

    async createPaymentWithQrCode(user: User, product: Product) {
        const pixQrCode = await this.paymentGateway.createPixOrder({
            amount: product.total,
            description: `Compra de rifa ${product.name}`,
            name: user.name,
            email: user.email,
            cpf: user.cpf
        });

        return pixQrCode
    }

    async checkPaymentStatus(id: number) {
        return await this.paymentGateway.checkPaymentStatus(id)
    }

    async simulatePayment(id: number) {
        return await this.paymentGateway.simulatePayment(id);
    }

    private convertPriceToCents(price: number){
        return price * 100
    }

    private calculateTotalQuantity(product: Product){
        return product.bonus + product.quantity
    }

    async savePayment(
        billing: BillingData, 
        user: User, 
        product: Product
    ){
        const userService = new UserService();
        let userDB = await userService.getOrCreate(user)
        const payment: Payment = {
            id: billing.id,
            status: billing.status,
            userId: userDB.id,
            productId: product.id,
            devMode: false,
            paidAmount: billing.amount,
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

    async getPayments(devMode: boolean = true): Promise<Payment[]> {
        const payments = await database.query(`SELECT * FROM payments WHERE "devMode" = ${devMode};`)
        return payments.rows
    }

    async getPayment(id: string): Promise<Payment> {
        const payment = await database.query(`SELECT * FROM payments WHERE id = '${id}';`);
        return payment.rows[0];
    }
    async getPaymentInfo(id: string): Promise<PaymentInfo> {
        const payment = await this.getPayment(id);
        const product = await getProduct(payment.productId);
        const user = await new UserService().getById(payment.userId.toString()); 
        const paymentInfo: PaymentInfo = {
            id: payment.id,
            devMode: payment.devMode,
            paidAmount: payment.paidAmount,
            quantityWithBonus: payment.quantityWithBonus,
            status: payment.status,
            product: product,
            user: user,
        }
        return paymentInfo;
    }

    async updatePaymentStatus(id: string, status: string) {
        try {
            await database.query(
                `UPDATE payments SET status = '${status}', "updateAt" = NOW() WHERE id = '${id}';`
            );

            return await this.getPaymentInfo(id);
        } catch (error) {
            throw error
        }
    }

    async getTotalTickets() {
        try {
            const totalTickets = await database.query(
                `SELECT SUM("quantityWithBonus") FROM payments WHERE status = 'approved';`
            );
            return totalTickets.rows[0];
        } catch (error) {
            throw error
        }
    }
}