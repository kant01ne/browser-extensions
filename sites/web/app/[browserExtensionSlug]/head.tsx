import { extensionListConfig } from "@/config/extensionList"

export default async function Head({
  params: { browserExtensionSlug },
  children
}: {
  children: React.ReactNode
  params: { browserExtensionSlug: keyof typeof extensionListConfig }
}) {
  const site = extensionListConfig[browserExtensionSlug]
  return (
    <>
      <head>
        <title>{site.name}</title>
        <meta charSet="utf-8" />
        <meta content="width=device-width" name="viewport" />
        <meta content={site.longDescription} name="description" />

        <meta content={site.name} property="og:title" />
        <meta content="website" property="og:type" />
        <meta
          content={`https://browser-extensions.vercel.app/${browserExtensionSlug}`}
          property="og:url"
        />
        <meta
          content={`https://browser-extensions.vercel.app/og/${browserExtensionSlug}.png`}
          property="og:image"
        />
        <meta content={site.name} name="twitter:title" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta
          content={`https://browser-extensions.vercel.app/${browserExtensionSlug}`}
          property="twitter:url"
        />
        <meta
          content={`https:/browser-extensions.vercel.app/og/${browserExtensionSlug}.jpg`}
          name="twitter:image"
        />
        <link href={`/images/logo/${browserExtensionSlug}.png`} rel="icon" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <style>
          {`
            
            :root {
              --color-bg-from: ${site.tailwind.colors.brand.bgFrom};
              --color-bg-to: ${site.tailwind.colors.brand.bgTo};
              --color-default: ${site.tailwind.colors.brand.DEFAULT};
              --color-descHighlight01From: ${site.tailwind.colors.brand.descHighlight01From};
              --color-descHighlight01To: ${site.tailwind.colors.brand.descHighlight01To};
              --color-descHighlight02From: ${site.tailwind.colors.brand.descHighlight02From};
              --color-descHighlight02To: ${site.tailwind.colors.brand.descHighlight02To};
            }

        `}
        </style>
      </head>
    </>
  )
}
