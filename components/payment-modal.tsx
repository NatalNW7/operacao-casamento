"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/domain/models"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, CheckCircle, Clock } from "lucide-react"
import Image from "next/image"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  ticketQuantity: number
  pricing: Product
}

export function PaymentModal({ isOpen, onClose, ticketQuantity, pricing }: PaymentModalProps) {
  const [paymentStep, setPaymentStep] = useState<"details" | "pix" | "success">("details")
  const [pixCode, setPixCode] = useState("")
  const [pixQrCode, setPixQrCode] = useState("")
  const [paymentId, setPaymentId] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    cpf: "",
  })

  const onCloseRefresh = () => {
    if(paymentStep === 'success'){
      setPixCode("")
      setPixQrCode("")
      setPaymentId("")
      setPaymentStep("details")
    }
    onClose()
  }

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode)
  }

  const handlePaymentConfirm = () => {
    handlePixQrCode()
  }

  const simulatePayment = async () => {
    try {
      const response = await fetch(`/api/payment/simulate?paymentId=${paymentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      if (!response.ok) {
        alert("Falha ao simular pagamento.")
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Ocorreu um erro inesperado ao simular pagamento.")
    }
  }

  const handlePixQrCode = async () => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            name: customerInfo.name,
            whatsapp: customerInfo.phone,
            email: customerInfo.email,
            cpf: customerInfo.cpf,
          },
          product: {
            ...pricing,
          },
        }),
      })

      const billing = await response.json()

      if (!response.ok) {
        alert("Falha ao gerar o Pix QR Code.")
      }

      setPaymentId(billing.id)
      setPixCode(billing.point_of_interaction.transaction_data.qr_code)
      setPixQrCode(billing.point_of_interaction.transaction_data.qr_code_base64)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Ocorreu um erro inesperado ao gerar o Pix QR Code.")
    } finally {
      setPaymentStep("pix")
    }
  }

  useEffect(() => {
    if (paymentStep !== "pix" || !paymentId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/payment?paymentId=${paymentId}`);
        const payment = await res.json();

        if (payment.status === "approved") {
          clearInterval(interval);
          setPaymentStep("success");
        }
      } catch (err) {
        console.error("Erro ao verificar status do pagamento:", err);
      }
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval); // cleanup
  }, [paymentStep, paymentId]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseRefresh}>
      <DialogContent className="max-w-md">
        {paymentStep === "details" && (
          <>
            <DialogHeader>
              <DialogTitle>Finalizar Compra</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Tickets:</span>
                    <span className="font-semibold">{ticketQuantity}</span>
                  </div>
                  {pricing.bonus > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span>Bônus:</span>
                      <Badge className="bg-green-100 text-green-800">+{pricing.bonus} grátis</Badge>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-green-600">R$ {pricing.total}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={customerInfo.cpf}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">WhatsApp</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <Button
                onClick={handlePaymentConfirm}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.email}
              >
                Continuar para PIX
              </Button>
              <div className="text-xs text-gray-500 text-center">
                Seus dados serão usados para gerar o comprovante de pagamento
              </div>
            </div>
          </>
        )}

        {paymentStep === "pix" && (
          <>
            <DialogHeader>
              <DialogTitle>Pagamento via PIX</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">R$ {pricing.total}</div>
                  <div className="text-sm text-gray-600">
                    {ticketQuantity} tickets {pricing.bonus > 0 && `+ ${pricing.bonus} bônus`}
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="copy" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="copy">Copiar Código</TabsTrigger>
                  <TabsTrigger value="qr">QR Code</TabsTrigger>
                </TabsList>

                <TabsContent value="copy" className="space-y-3">
                  <div>
                    <Label>Código PIX Copia e Cola</Label>
                    <div className="flex gap-2">
                      <Input value={pixCode} readOnly className="text-xs" />
                      <Button onClick={handleCopyPix} size="icon" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="qr" className="text-center">
                  <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg mx-auto flex items-center justify-center">
                    {/* <QrCode  className="h-32 w-32 text-gray-400" /> */}
                    <Image src={`data:image/png;base64,${pixQrCode}`} width={400} height={400} alt="QR Code"></Image>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Escaneie com seu app do banco</p>
                </TabsContent>
              </Tabs>

              {/* <Button onClick={simulatePayment} className="w-full bg-transparent" variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Simular Pagamento (Demo)
              </Button> */}

              <div className="text-xs text-gray-500 text-center">
                Após o pagamento, você receberá confirmação no email
              </div>
            </div>
          </>
        )}

        {paymentStep === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-green-600">Pagamento Confirmado!</DialogTitle>
            </DialogHeader>

            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />

              <div>
                <h3 className="font-semibold text-lg">Parabéns!</h3>
                <p className="text-gray-600">Seus tickets foram reservados com sucesso</p>
              </div>

              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tickets comprados:</span>
                      <span className="font-semibold">{ticketQuantity}</span>
                    </div>
                    {pricing.bonus > 0 && (
                      <div className="flex justify-between">
                        <span>Tickets bônus:</span>
                        <span className="font-semibold text-green-600">+{pricing.bonus}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2">
                      <span>Total de tickets:</span>
                      <span className="font-bold">{ticketQuantity + pricing.bonus}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-sm text-gray-600">
                <p>✅ Comprovante enviado por e-mail</p>
                <p>✅ Participação confirmada no sorteio</p>
              </div>

              <Button onClick={onCloseRefresh} className="w-full">
                Fechar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
