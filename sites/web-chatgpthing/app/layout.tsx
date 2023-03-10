import { Sora } from "@next/font/google"
import React from "react"

import "@/style/globals.css"

import { cn } from "utils/cn"

const fontSans = Sora({
  subsets: ["latin"],
  variable: "--font-sora"
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={cn(
        "bg-gradient-to-r from-fuchsia-900 to-pink-900 font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
      lang="en">
      <head />
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
