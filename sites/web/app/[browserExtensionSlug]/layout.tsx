import { SiteFooter } from "@/components/Footer"
import { extensionListConfig } from "@/config/extensionList"
import { notFound } from "next/navigation"
import React from "react"

export async function generateStaticParams() {
  return Object.keys(extensionListConfig).map((browserExtensionSlug) => ({
    browserExtensionSlug:
      browserExtensionSlug as unknown as keyof typeof extensionListConfig
  }))
}

export default function Layout({
  params: { browserExtensionSlug },
  children
}: {
  children: React.ReactNode
  params: { browserExtensionSlug: keyof typeof extensionListConfig }
}) {
  if (!extensionListConfig[browserExtensionSlug]) {
    return notFound()
  }

  return (
    <div className="bg-gradient-to-r from-brand-from to-brand-to min-h-screen text-brand">
      <section
        style={{
          backgroundImage: "url('./images/stars.svg')",
          backgroundSize: "cover"
        }}
        className="container grid items-center justify-center gap-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:pt-16 lg:pb-24">
        {children}
      </section>
      <SiteFooter browserExtensionSlug={browserExtensionSlug} />
    </div>
  )
}
