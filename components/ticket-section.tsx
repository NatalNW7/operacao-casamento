"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PaymentModal } from "@/components/payment-modal"
import { Minus, Plus, Ticket, Gift } from "lucide-react"


export function TicketSection() {
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [showPayment, setShowPayment] = useState(false)

  const pricingTiers = [
    { quantity: 1, price: 7, label: "Ticket Individual", popular: false },
    { quantity: 3, price: 6, label: "Pacote Amigos", popular: true },
    { quantity: 5, price: 5, label: "Pacote Família", popular: false },
    { quantity: 10, price: 5, label: "Pacote Especial", bonus: 1, popular: false },
  ]

    const getPricing = (selectedQuantity: number) => {
    if (selectedQuantity >= 10) {
      return { quantity: selectedQuantity, price: 5, bonus: Math.floor(selectedQuantity / 10), total: selectedQuantity * 5, name: "Pacote Especial", id: "PACOTE_ESPECIAL" }
    } else if (selectedQuantity >= 5) {
      return { quantity: selectedQuantity, price: 5, bonus: 0, total: selectedQuantity * 5, name: "Pacote Família", id: "PACOTE_FAMILIA" }
    } else if (selectedQuantity >= 3) {
      return { quantity: selectedQuantity, price: 6, bonus: 0, total: selectedQuantity * 6, name: "Pacote Amigos", id: "PACOTE_AMIGOS" }
    } else {
      return { quantity: selectedQuantity, price: 7, bonus: 0, total: selectedQuantity * 7, name: "Ticket Individual", id: "TICKET_INDIVIDUAL" }
    }
  }

  const pricing = getPricing(selectedQuantity)

  const getEffectiveTickets = (qty: number) => {
    if (qty >= 10) return qty + Math.floor(qty / 10)
    return qty
  }

  return (
    <section id="tickets" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Escolha Seus Tickets</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quanto mais tickets, maior é a sua chance de ganhar! Aproveite nossas ofertas especiais.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.quantity}
                className={`relative cursor-pointer transition-all hover:shadow-lg ${
                  tier.popular ? "ring-2 ring-rose-500 shadow-lg" : ""
                }`}
                onClick={() => setSelectedQuantity(tier.quantity)}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rose-600 text-white">
                    Mais Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg">{tier.label}</CardTitle>
                  <div className="text-3xl font-bold text-rose-600">
                    R$ {tier.price}
                    <span className="text-sm text-gray-500">/ticket</span>
                  </div>
                </CardHeader>

                <CardContent className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Ticket className="h-8 w-8 text-rose-500 mr-2" />
                    <span className="text-2xl font-bold">{tier.quantity}</span>
                    {tier.bonus && (
                      <>
                        <Plus className="h-4 w-4 text-green-500 mx-1" />
                        <span className="text-green-600 font-bold">{tier.bonus}</span>
                        <Gift className="h-4 w-4 text-green-500 ml-1" />
                      </>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    Total: R$ {tier.quantity * tier.price}
                    {tier.bonus && <div className="text-green-600 font-semibold">+{tier.bonus} ticket GRÁTIS!</div>}
                  </div>

                  <Button variant={selectedQuantity === tier.quantity ? "default" : "outline"} className="w-full">
                    {selectedQuantity === tier.quantity ? "Selecionado" : "Selecionar"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Quantidade Personalizada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  disabled={selectedQuantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{selectedQuantity}</div>
                  <div className="text-sm text-gray-600">tickets</div>
                </div>

                <Button variant="outline" size="icon" onClick={() => setSelectedQuantity(selectedQuantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-rose-600 mb-2">
                  Total: R$ {pricing.total}
                </div>
                {getEffectiveTickets(selectedQuantity) > selectedQuantity && (
                  <div className="text-green-600 font-semibold">
                    Você receberá {getEffectiveTickets(selectedQuantity)} tickets!
                    <span className="text-sm block">
                      ({getEffectiveTickets(selectedQuantity) - selectedQuantity} grátis)
                    </span>
                  </div>
                )}
              </div>

              <Button onClick={() => setShowPayment(true)} size="lg" className="w-full bg-rose-600 hover:bg-rose-700 text-white text-lg py-6">
                Comprar {selectedQuantity} Ticket{selectedQuantity > 1 ? "s" : ""} - R${" "}
                {pricing.total}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        ticketQuantity={selectedQuantity}
        pricing={pricing}
      />
    </section>
  )
}
