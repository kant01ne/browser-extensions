import { extensionURLHash } from "@/components/useExtensionURL"
import Link from "next/link"
import React from "react"
import { Button } from "ui/button"
import { ChromeLogo } from "ui/logo/ChromeLogo"
import { FirefoxLogo } from "ui/logo/FirefoxLogo"

export const InstallLogoHeader = () => (
  <>
    <Button className="w-16" variant="link">
      <Link href={extensionURLHash["Firefox"]} target="_blank">
        <span>
          <FirefoxLogo height={32} width={32} />
        </span>
      </Link>
    </Button>

    <Button className="w-16" variant="link">
      <Link href={extensionURLHash["Chrome"]} target="_blank">
        <span>
          <ChromeLogo height={32} width={32} />
        </span>
      </Link>
    </Button>
  </>
)
