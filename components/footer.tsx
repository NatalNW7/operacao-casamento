import { Heart, Instagram, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-rose-500 fill-current" />
              <div>
                <h3 className="text-lg font-bold">Operação Casamento</h3>
                <p className="text-rose-400">B&N</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Nos ajude a realizar esse sonho do casamento perfeito. Cada ticket comprado nos aproxima
              mais desse momento especial!
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-rose-500" />
                <span className="text-gray-400">(11) 99999-9999</span>
              </div>
              {/* <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-rose-500" />
                <span className="text-gray-400">contato@operacaocasamentobn.com</span>
              </div> */}
              <div className="flex items-center space-x-3">
                <Instagram className="h-4 w-4 text-rose-500" />
                <span className="text-gray-400">@_barbaragms</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="h-4 w-4 text-rose-500" />
                <span className="text-gray-400">@_natanaelw</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Informações</h4>
            <ul className="space-y-2 text-gray-400">
              {/* <li>• Sorteio: 15/03/2025</li> */}
              <li>• Transmissão ao vivo</li>
              <li>• Pagamento via PIX</li>
              <li>• Entrega dos prêmios em até 7 dias</li>
              <li>• Suporte via WhatsApp</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Operação Casamento B&N. Feito com{" "}
            <Heart className="h-4 w-4 text-rose-500 fill-current inline mx-1" /> para nosso futuro juntos.
          </p>
        </div>
      </div>
    </footer>
  )
}
