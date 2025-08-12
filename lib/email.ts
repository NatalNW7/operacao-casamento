import { centsToBRL } from "./money-conversor";
import nodemailer from 'nodemailer'

interface Transaction {
  id: string
  status: string
  amount: number
  user: {
    email: string
    name: string
  }
}

export async function sendEmail(transaction: Transaction) {
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
    const emailBody = transaction.status === 'approved' ? paymentSuccessTemplate(transaction, date) : paymentFailedTemplate(transaction, date);

    await trasporter.sendMail({
      from: process.env.EMAIL_USER,
      to: transaction.user.email,
      subject: 'Operação Casamento B&N',
      html: emailBody
    });
  } catch (error) {
    throw error;
  }
}

function paymentSuccessTemplate(transaction: Transaction, date: string): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #2e7d32;">✅ Pagamento Confirmado!</h2>
      <p>Olá, ${transaction.user.name}.</p>
      <p>Seu pagamento foi processado com sucesso!</p>
      <ul>
        <li><strong>ID da Transação:</strong> ${transaction.id}</li>
        <li><strong>Valor:</strong> ${transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
        <li><strong>Data:</strong> ${date}</li>
      </ul>
      <p>Obrigado por nos ajudar 😁!</p>
      <p> Bárbara e Natanael.</p>
    </div>
  `;
}

function paymentFailedTemplate(transaction: Transaction, date: string): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #c62828;">❌ Houve um problema com o seu pagamento!</h2>
      <p>Olá, ${transaction.user.name}.</p>
      <p>Infelizmente, seu pagamento não pôde ser processado 😥.</p>
      <ul>
        <li><strong>ID da Transação:</strong> ${transaction.id}</li>
        <li><strong>Valor:</strong> ${transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
        <li><strong>Data:</strong> ${date}</li>
      </ul>
      <p>Por favor, tente novamente ou entre em contato conosco.</p>
      <p>Bárbara e Natanael.</p>
    </div>
  `;
}
