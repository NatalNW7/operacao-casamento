import { Heart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-rose-500 fill-current" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Operação Casamento</h1>
              <p className="text-sm text-rose-600">B&N</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#premio" className="text-gray-700 hover:text-rose-600 transition-colors">
              Prêmios
            </a>
            <a href="#tickets" className="text-gray-700 hover:text-rose-600 transition-colors">
              Tickets
            </a>
            <a href="#como-funciona" className="text-gray-700 hover:text-rose-600 transition-colors">
              Como Funciona
            </a>
          </nav>

          <Button className="md:hidden" variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
