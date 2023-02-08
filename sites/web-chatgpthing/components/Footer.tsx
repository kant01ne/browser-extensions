import { siteConfig } from "@/config/site"
import Link from "next/link"
import React from "react"

export function SiteFooter() {
  return (
    <footer className="container  text-slate-50">
      <div className="flex  flex-col items-center justify-between gap-4 border-t border-t-slate-200 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              className="font-medium underline underline-offset-4"
              href={siteConfig.links.twitter}
              rel="noreferrer"
              target="_blank">
              kant01ne
            </a>
            . Hosted on{" "}
            <a
              className="font-medium underline underline-offset-4"
              href="https://vercel.com"
              rel="noreferrer"
              target="_blank">
              Vercel
            </a>
            .
          </p>
        </div>
        <p className="text-center text-sm md:text-left">
          The source code is available on{" "}
          <Link
            className="font-medium underline underline-offset-4"
            href={siteConfig.links.github}
            rel="noreferrer"
            target="_blank">
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
