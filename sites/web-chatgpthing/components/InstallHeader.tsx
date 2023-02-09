import { extensionURLHash } from "@/components/useExtensionURL"
import transparentLogo from "@/public/images/logo-transparent.png"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Button } from "ui/button"
import { SpotlightHeader } from "ui/chatgpthing/SpotlightHeader"
import { ChromeLogo } from "ui/logo/ChromeLogo"
import { FirefoxLogo } from "ui/logo/FirefoxLogo"

export const InstallHeader = ({
  withDescription
}: {
  withDescription?: boolean
}) => (
  <div
    className="flex flex-col items-center justify-center space-y-4"
    onClick={(e) => {
      e.stopPropagation()
    }}>
    <div className="my-4 flex flex-col items-center justify-center">
      <Image
        alt="ChatGPThing Logo"
        height={128}
        src={transparentLogo}
        width={128}
      />
      <h1 className="text-white mt-4 text-4xl font-bold text-center">
        ChatGPThing
      </h1>
      {withDescription ? (
        <SpotlightHeader className="text-white text-2xl mt-8 px-8" />
      ) : null}
    </div>
    <Button className="w-56">
      <Link href={extensionURLHash["Chrome"]} target="_blank">
        <span className="flex">
          <span className="px-2">
            <ChromeLogo height={16} width={16} />
          </span>
          Add to Chrome
        </span>
      </Link>
    </Button>

    <Button className="w-56">
      <Link href={extensionURLHash["Firefox"]} target="_blank">
        <span className="flex">
          <span className="px-2">
            <FirefoxLogo height={16} width={16} />
          </span>
          Add to Firefox
        </span>
      </Link>
    </Button>
  </div>
)
