import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Headphones, Wind } from "lucide-react"

export function PrizeSection() {
  return (
    <section id="premio" className="py-20 px-4 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Prêmios da Rifa</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Concorra a produtos premium que vão fazer a diferença no seu dia a dia!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-rose-50">
            <CardContent className="p-0">
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-rose-600 text-white px-4 py-2 text-lg font-semibold">Prêmio Principal</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Headphones className="h-16 w-16 text-gray-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Fones Apple Premium</h3>
                    <p className="text-gray-600 mb-4">Qualidade de som excepcional com cancelamento de ruído ativo</p>
                    <div className="text-3xl font-bold text-rose-600">R$ 2.500</div>
                  </div>

                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Wind className="h-16 w-16 text-blue-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Secador Profissional</h3>
                    <p className="text-gray-600 mb-4">Tecnologia iônica para cabelos mais saudáveis e brilhantes</p>
                    <div className="text-3xl font-bold text-rose-600">R$ 800</div>
                  </div>
                </div>

                <div className="bg-rose-600 text-white p-6 text-center">
                  <h4 className="text-2xl font-bold mb-2">Valor Total dos Prêmios</h4>
                  <div className="text-4xl font-bold">R$ 3.300</div>
                  <p className="mt-2 opacity-90">Um ganhador levará tudo!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
