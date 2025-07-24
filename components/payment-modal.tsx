"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, QrCode, CheckCircle, Clock } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  ticketQuantity: number
  pricing: {
    price: number
    bonus: number
    total: number
  }
}

export function PaymentModal({ isOpen, onClose, ticketQuantity, pricing }: PaymentModalProps) {
  const [paymentStep, setPaymentStep] = useState<"details" | "pix" | "success">("details")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
  })

  const pixCode =
    "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540" +
    pricing.total.toFixed(2) +
    "5802BR5925RIFA SAAS LTDA6009SAO PAULO62070503***6304"

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode)
  }

  const handlePaymentConfirm = () => {
    setPaymentStep("pix")
  }

  const simulatePayment = () => {
    setTimeout(() => {
      setPaymentStep("success")
    }, 3000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                    <span>Números:</span>
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
                    {ticketQuantity} números {pricing.bonus > 0 && `+ ${pricing.bonus} bônus`}
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
                    <QrCode className="h-32 w-32 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Escaneie com seu app do banco</p>
                </TabsContent>
              </Tabs>

              <Button onClick={simulatePayment} className="w-full bg-transparent" variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Simular Pagamento (Demo)
              </Button>

              <div className="text-xs text-gray-500 text-center">
                Após o pagamento, você receberá seus números por WhatsApp
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
                <p className="text-gray-600">Seus números foram reservados com sucesso</p>
              </div>

              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Números comprados:</span>
                      <span className="font-semibold">{ticketQuantity}</span>
                    </div>
                    {pricing.bonus > 0 && (
                      <div className="flex justify-between">
                        <span>Números bônus:</span>
                        <span className="font-semibold text-green-600">+{pricing.bonus}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2">
                      <span>Total de números:</span>
                      <span className="font-bold">{ticketQuantity + pricing.bonus}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-sm text-gray-600">
                <p>✅ Comprovante enviado por e-mail</p>
                <p>✅ Números enviados via WhatsApp</p>
                <p>✅ Participação confirmada no sorteio</p>
              </div>

              <Button onClick={onClose} className="w-full">
                Fechar
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
