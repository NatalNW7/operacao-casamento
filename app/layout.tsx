import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Operação Casamento B&N',
  description: 'Created by NatalNW7',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
