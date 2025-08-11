import { eventPaid } from "@/domain/models";
import { centsToBRL } from "./money-conversor";
import nodemailer from 'nodemailer'

export async function sendEmail(transaction: eventPaid) {
  try {
    const trasporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const date = new Date().toLocaleDateString('pt-br')
    const emailBody = transaction.data.pixQrCode.status === 'PAID' ? paymentSuccessTemplate(transaction, date) : paymentFailedTemplate(transaction, date);

    await trasporter.sendMail({
      from: process.env.EMAIL_USER,
      to: transaction.data.pixQrCode.customer.metadata.email,
      subject: 'Operação Casamento B&N',
      html: emailBody
    });
  } catch (error) {
    throw error;
  }
}

function paymentSuccessTemplate(transaction: eventPaid, date: string): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #2e7d32;">✅ Pagamento Confirmado!</h2>
      <p>Olá, ${transaction.data.pixQrCode.customer.metadata.name}.</p>
      <p>Seu pagamento foi processado com sucesso!</p>
      <ul>
        <li><strong>ID da Transação:</strong> ${transaction.data.pixQrCode.id}</li>
        <li><strong>Valor:</strong> ${centsToBRL(transaction.data.pixQrCode.amount)}</li>
        <li><strong>Data:</strong> ${date}</li>
      </ul>
      <p>Obrigado por nos ajudar 😁!</p>
      <p> Bárbara e Natanael.</p>
    </div>
  `;
}

function paymentFailedTemplate(transaction: eventPaid, date: string): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #c62828;">❌ Houve um problema com o seu pagamento!</h2>
      <p>Olá, ${transaction.data.pixQrCode.customer.metadata.name}.</p>
      <p>Infelizmente, seu pagamento não pôde ser processado 😥.</p>
      <ul>
        <li><strong>ID da Transação:</strong> ${transaction.data.pixQrCode.id}</li>
        <li><strong>Valor:</strong> ${centsToBRL(transaction.data.pixQrCode.amount)}</li>
        <li><strong>Data:</strong> ${date}</li>
      </ul>
      <p>Por favor, tente novamente ou entre em contato conosco.</p>
      <p>Bárbara e Natanael.</p>
    </div>
  `;
}
