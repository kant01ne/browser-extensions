"use client"

import { SiteFooter } from "@/components/Footer"
import { InstallHeader } from "@/components/InstallHeader"
import { SpotlightBoxContainer } from "@/components/SpotlightBoxContainer"
import { extensionURLHash, useExtensionURL } from "@/components/useExtensionURL"
import demo1 from "@/public/images/demo1.png"
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Button } from "ui/button"
import { ChromeLogo } from "ui/logo/ChromeLogo"
import { FirefoxLogo } from "ui/logo/FirefoxLogo"

const prompt1 = "So... what are you exactly?"
const prompt2 =
  "Hum... ok, so why can't I just copy and paste the page's text into ChatGPT? 🤔"
const defaultAnswer2 =
  "Yeah sure, you could copy and paste the page's text into ChatGPT, I can also try to catch a fly with a pair of chopsticks but there's a reason I go with the fly swatter!"
export const LandingPage = () => {
  /*
   * Hooks.
   */
  const extensionURL = useExtensionURL()
  /*
   * Memos.
   */
  const defaultAnswer1 = React.useMemo(
    () =>
      `I'm [ChatGPThing](${extensionURL}), I'm a browser extension that uses GPT-3 to answer questions about the page you're on. Once you've installed me, you can ask me questions about the page you're on by clicking the ChatGPThing icon in your browser's toolbar or by pressing the shortcut key (Alt+Z by default).`,
    [extensionURL]
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const parallax = React.useRef<IParallax>(null!)
  return (
    <div className="flex justify-center flex-col h-[100vh] max-w-screen-lg">
      <Parallax
        className="bg-gradient-to-r from-fuchsia-900 to-pink-900"
        id="parallax"
        pages={5}
        ref={parallax}>
        <ParallaxLayer
          factor={5}
          offset={0}
          speed={0}
          style={{
            backgroundImage: "url('./images/stars.svg')",
            backgroundSize: "cover"
          }}
        />

        <ParallaxLayer
          offset={4.25}
          speed={-0.2}
          style={{
            backgroundImage: "url('./images/sun.svg')",
            backgroundSize: "cover",
            marginLeft: "30%"
          }}
        />

        <ParallaxLayer
          offset={4}
          speed={0}
          style={{
            backgroundImage: "url('./images/waves.svg')",
            backgroundSize: "cover"
          }}
        />

        <ParallaxLayer
          className="flex items-center flex-col justify-between pt-8"
          offset={4}
          speed={1}
          sticky={{ end: 5, start: 4 }}>
          <InstallHeader withDescription={true} />
          <SiteFooter />
        </ParallaxLayer>
        <ParallaxLayer
          className="flex md:!w-[50%] md:ml-[50%] items-center flex-col justify-center"
          offset={2.6}
          speed={0.3}>
          <SpotlightBoxContainer
            defaultAnswer={defaultAnswer2}
            isDisabled={false}
            isOnboarding={true}
            isSpotlightOpen={true}
            onSetAnswer={(old) => {
              return defaultAnswer2.slice(
                0,
                old.length + Math.floor(Math.random() * 10) + 1
              )
            }}
            prompt={prompt2}
            triggerSubmitAfter={false}
          />
        </ParallaxLayer>
        <ParallaxLayer
          className="hidden md:block !ml-[-10%] md:!w-[70%] lg:!w-[60%]"
          offset={1.8}
          speed={-0.5}
          style={{ pointerEvents: "none" }}>
          <Image alt="Demo" height={504} src={demo1} width={1007} />
        </ParallaxLayer>

        <ParallaxLayer
          className="hidden md:flex flex-row-reverse pt-4 pr-4 !h-10"
          offset={0}
          sticky={{ end: 2.5, start: 0 }}>
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
        </ParallaxLayer>

        <ParallaxLayer
          className="flex items-center flex-col justify-center mt-20 !w-[50%] !m-auto"
          offset={0}
          speed={-0.5}
          sticky={{ end: 0.5, start: 0 }}>
          <SpotlightBoxContainer
            defaultAnswer={defaultAnswer1}
            isSpotlightOpen={true}
            onSetAnswer={(old) => {
              if (old.length === 0) {
                return defaultAnswer1.slice(0, 3)
              }

              if (old.length === 3) {
                return defaultAnswer1.split(", ")[0]
              }
              return defaultAnswer1.slice(
                0,
                old.length + Math.floor(Math.random() * 10) + 1
              )
            }}
            prompt={prompt1}
          />
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}
