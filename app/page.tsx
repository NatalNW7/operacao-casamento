import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PrizeSection } from "@/components/prize-section"
import { TicketSection } from "@/components/ticket-section"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Header />
      <Hero />
      <PrizeSection />
      <TicketSection />
      <HowItWorks />
      <Footer />
    </div>
  )
}
