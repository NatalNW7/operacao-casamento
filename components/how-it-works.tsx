import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, CreditCard, Gift, Users } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Smartphone,
      title: "Escolha seus tickets",
      description: "Selecione a quantidade de tickets que deseja comprar. Quanto mais, maior o desconto!",
    },
    {
      icon: CreditCard,
      title: "Pague com PIX",
      description: "Pagamento instantâneo via PIX com QR Code ou copia e cola. Rápido e seguro!",
    },
    {
      icon: Users,
      title: "Receba confirmação",
      description: "Você recebera confirmação de participação da rifa por email imediatamente.",
    },
    {
      icon: Gift,
      title: "Aguarde o sorteio",
      description: "O sorteio será realizado ao vivo e transmitido para total transparência.",
    },
  ]

  return (
    <section id="como-funciona" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Participar é muito simples! Siga estes passos e concorra aos prêmios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <Card className="w-20 h-20 mx-auto bg-gradient-to-br from-rose-500 to-pink-600 border-0 shadow-lg">
                  <CardContent className="flex items-center justify-center h-full p-0">
                    <step.icon className="h-8 w-8 text-white" />
                  </CardContent>
                </Card>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-rose-600 to-pink-600 border-0 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Transmissão ao vivo no Instagram</h3>
              {/* <h3 className="text-2xl font-bold mb-4">Data do Sorteio</h3> */}
              <p className="text-lg mb-2">@_barbaragms e @_natanaelw</p>
              {/* <p className="text-lg mb-2">15 de Março de 2025 - 20:00h</p> */}
              {/* <p className="opacity-90">Transmissão ao vivo no Instagram @operacaocasamentoBN</p> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
