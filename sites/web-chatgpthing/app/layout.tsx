import { Sora } from "@next/font/google"
import React from "react"

import "@/style/globals.css"

import { Analytics } from "@/components/analytics"
import { cn } from "utils/cn"

const fontSans = Sora({
  subsets: ["latin"],
  variable: "--font-inter"
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={cn(
        "bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
      lang="en">
      <head />
      <body className="min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
