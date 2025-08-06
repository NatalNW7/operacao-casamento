import { Card, CardContent } from "@/components/ui/card"
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
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Headphones className="h-16 w-16 text-gray-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Fone Apple Premium</h3>
                    <p className="text-gray-600 mb-4">Qualidade de som excepcional com cancelamento de ruído ativo</p>
                  </div>

                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Wind className="h-16 w-16 text-blue-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Secador Profissional</h3>
                    <p className="text-gray-600 mb-4">Tecnologia iônica para cabelos mais saudáveis e brilhantes</p>
                  </div>
                </div>

                <div className="bg-rose-600 text-white p-6 text-center">
                  <h4 className="text-2xl font-bold mb-2">Um ganhador levará tudo!</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
