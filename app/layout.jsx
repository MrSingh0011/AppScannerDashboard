import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AppProvider } from "@/contexts/app-context"
import "./globals.css"
import { Suspense } from "react"

export const metadata = {
  title: "App Scanner Dashboard",
  description: "Professional app security analysis and insights dashboard",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppProvider>{children}</AppProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
