import { extensionListConfig } from "@/config/extensionList"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import Balancer from "react-wrap-balancer"
import { Button } from "ui/button"
import { ChromeLogo } from "ui/logo/ChromeLogo"
import { FirefoxLogo } from "ui/logo/FirefoxLogo"

export default async function IndexPage({
  params: { browserExtensionSlug }
}: {
  params: { browserExtensionSlug: keyof typeof extensionListConfig }
}) {
  const site = extensionListConfig[browserExtensionSlug]
  const description = site.description
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 w-[100vw]">
        <div className="my-4 flex flex-col items-center justify-center">
          <Image
            alt={`${site.name} logo`}
            height={128}
            src={site.logo}
            width={128}
          />
          <h1 className="mt-4 text-4xl font-bold text-center">{site.name}</h1>
          {description ? (
            <div className="text-2xl mt-8 px-8">
              <h1 className="w-[100%] text-base flex text-center items-center justify-center mb-4">
                <Balancer>
                  {description.start}{" "}
                  {description.highlight01 ? (
                    <span className="px-1 font-extrabold inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-descHighlight01From to-brand-descHighlight01To">
                      {description.highlight01}
                    </span>
                  ) : null}{" "}
                  {description.middle ? description.middle : null}{" "}
                  {description.highlight02 ? (
                    <span className="px-1 font-extrabold inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-descHighlight02From to-brand-descHighlight02To">
                      {" "}
                      {description.highlight02}
                    </span>
                  ) : null}{" "}
                  {description.end ? ` ${description.end}` : null}
                </Balancer>
              </h1>
            </div>
          ) : null}
        </div>
        {site.extensions.Chrome ? (
          <Button className="w-56">
            <Link href={site.extensions.Chrome} target="_blank">
              <span className="flex">
                <span className="px-2">
                  <ChromeLogo height={16} width={16} />
                </span>
                Add to Chrome
              </span>
            </Link>
          </Button>
        ) : null}

        {site.extensions.Firefox ? (
          <Button className="w-56">
            <Link href={site.extensions.Firefox} target="_blank">
              <span className="flex">
                <span className="px-2">
                  <FirefoxLogo height={16} width={16} />
                </span>
                Add to Firefox
              </span>
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="w-[100vw] flex justify-center">
        <div className="my-8 flex flex-col items-center justify-center w-[90%] md:w-[75%] lg:w-[60%]">
          <div className="aspect-w-16 aspect-h-9 w-[100%]">
            <iframe
              style={{
                padding: "10px",
                background: "#000",
                WebkitBorderRadius: "20px",
                borderRadius: "20px",
                margin: "0 auto",
                overflow: "hidden"
              }}
              src={site.links.youtube}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </>
  )
}
