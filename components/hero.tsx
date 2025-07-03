import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Users, Gift } from "lucide-react"

export function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="group relative flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-rose-200">
              <div className="w-[48px] group-hover:w-[96px] h-12 bg-rose-100 rounded-full flex transition-all items-center justify-center relative overflow-hidden group">
                <span className="absolute transition-all duration-300 group-hover:text-rose-100 group-hover:-translate-y-full text-rose-600 font-bold text-lg">B</span>
                <span className="absolute translate-y-full transition-all duration-300 group-hover:translate-y-0 group-hover:text-rose-600 text-rose-100 font-bold text-lg">Bárbara</span>
              </div>
              <Heart className="h-6 w-6 text-rose-500 fill-current animate-pulse" />
              <div className="w-[48px] group-hover:w-[96px] h-12 bg-rose-100 rounded-full flex transition-all items-center justify-center relative overflow-hidden group">
                <span className="absolute transition-all duration-300 group-hover:text-rose-100 group-hover:-translate-y-full text-rose-600 font-bold text-lg">N</span>
                <span className="absolute translate-y-full transition-all duration-300 group-hover:translate-y-0 group-hover:text-rose-600 text-rose-100 font-bold text-lg">Natanael</span>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ajude-nos a Realizar
            <span className="text-rose-600 block">Nosso Sonho!</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bárbara e Natanael vão se casar! Participe da nossa rifa e concorra a prêmios incríveis enquanto nos
            ajuda a tornar nosso casamento ainda mais especial.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="p-6 bg-white/60 backdrop-blur-sm border-rose-200">
              <Gift className="h-8 w-8 text-rose-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Prêmios Incríveis</h3>
              <p className="text-gray-600 text-sm">Fones Apple Premium + Secador Profissional</p>
            </Card>

            <Card className="p-6 bg-white/60 backdrop-blur-sm border-rose-200">
              <Users className="h-8 w-8 text-rose-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Pagamento Fácil</h3>
              <p className="text-gray-600 text-sm">PIX instantâneo com QR Code ou copia e cola</p>
            </Card>

            <Card className="p-6 bg-white/60 backdrop-blur-sm border-rose-200">
              <Heart className="h-8 w-8 text-rose-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Causa Especial</h3>
              <p className="text-gray-600 text-sm">Ajude a realizar nosso sonho de casamento</p>
            </Card>
          </div>

          <Button
            size="lg"
            className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
             <a href="#tickets">
              Comprar Tickets Agora
             </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
