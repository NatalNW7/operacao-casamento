"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, QrCode, ArrowLeft, CheckCircle } from "lucide-react"
import { Header } from "@/components/header"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "copy">("qr")
  const [copied, setCopied] = useState(false)

  const pixCode =
    "00020126580014BR.GOV.BCB.PIX013636401234-5678-9012-3456-789012345678520400005303986540510.005802BR5925NATANAEL BARBARA CASAMENTO6009SAO PAULO62070503***6304ABCD"

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button onClick={() => router.back()} variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>5 tickets</span>
                  <span>R$ 25,00</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Desconto (5+ tickets)</span>
                  <span>-R$ 10,00</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span className="text-rose-600">R$ 15,00</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Pagamento via PIX</CardTitle>
              <p className="text-center text-gray-600">Escolha como deseja pagar: QR Code ou Copia e Cola</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Button
                  variant={paymentMethod === "qr" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setPaymentMethod("qr")}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                </Button>
                <Button
                  variant={paymentMethod === "copy" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setPaymentMethod("copy")}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copia e Cola
                </Button>
              </div>

              {paymentMethod === "qr" ? (
                <div className="text-center">
                  <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-gray-400">
                      <QrCode className="h-32 w-32 mx-auto mb-2" />
                      <p>QR Code PIX</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Abra o app do seu banco e escaneie o QR Code</p>
                  <Badge className="bg-green-100 text-green-800">Pagamento instantâneo</Badge>
                </div>
              ) : (
                <div>
                  <Label htmlFor="pix-code" className="text-sm font-medium">
                    Código PIX Copia e Cola
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input id="pix-code" value={pixCode} readOnly className="font-mono text-xs" />
                    <Button onClick={handleCopy} variant="outline">
                      {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Copie o código e cole no seu app bancário</p>
                </div>
              )}

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Após o pagamento:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Seus números serão enviados por WhatsApp</li>
                  <li>• Confirmação por email em até 5 minutos</li>
                  <li>• Suporte disponível 24/7</li>
                </ul>
              </div>

              <div className="mt-6">
                <Label htmlFor="whatsapp" className="text-sm font-medium">
                  WhatsApp para receber os números *
                </Label>
                <Input id="whatsapp" placeholder="(11) 99999-9999" className="mt-2" />
              </div>

              <div className="mt-6">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email para confirmação *
                </Label>
                <Input id="email" type="email" placeholder="seu@email.com" className="mt-2" />
              </div>

              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">
                Confirmar Dados e Aguardar Pagamento
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
