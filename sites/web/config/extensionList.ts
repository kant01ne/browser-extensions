import chatGPThingLogo from "@/public/images/logo/chatgpthing.png"
import twitShorterLogo from "@/public/images/logo/twitshorter.png"
import type { StaticImageData } from "next/image"
import colors from "tailwindcss/colors"

const extensionList = ["chatgpthing", "twitshorter"] as const

export type extensionListType = (typeof extensionList)[number]

type ExtensionConfig = {
  links: {
    github: string
    twitter: string
    youtube?: string
  }
  name: string
  longDescription: string
  description?: {
    start: string
    highlight01: string
    middle: string
    highlight02: string
    end?: string
  }
  extensions: {
    Chrome?: string
    Firefox?: string
    Edge?: string
  }
  logo: StaticImageData
  tailwind: {
    colors: {
      brand: {
        bgFrom: string
        bgTo: string
        DEFAULT: string
        descHighlight01From: string
        descHighlight02From: string
        descHighlight01To: string
        descHighlight02To: string
      }
    }
  }
}

export const extensionListConfig: Record<extensionListType, ExtensionConfig> = {
  chatgpthing: {
    logo: chatGPThingLogo,
    links: {
      youtube: "https://www.youtube.com/embed/g85b8V11adw",
      github:
        "https://github.com/kant01ne/browser-extensions/tree/main/apps/chatgpthing",
      twitter: "https://twitter.com/kant01ne"
    },
    extensions: {
      Chrome:
        "https://chrome.google.com/webstore/detail/chatgpthing/amiibkaljanlkpjljhlkgjdfemgkklbo?hl=en&authuser=0&utm_source=landing",
      Firefox:
        "https://addons.mozilla.org/en-US/firefox/addon/chatgpthing/?utm_source=landing"
    },
    name: "ChatGPThing",
    longDescription:
      "An open source browser extension to query ChatGPT with the current page context.",
    description: {
      start: "Query",
      highlight01: "chatGPT",
      middle: "in the",
      highlight02: "context",
      end: "of the current page"
    },
    tailwind: {
      colors: {
        brand: {
          bgFrom: colors.fuchsia[900],
          bgTo: colors.rose[500],
          DEFAULT: colors.white,
          descHighlight01From: colors.purple[400],
          descHighlight01To: colors.rose[600],
          descHighlight02From: colors.sky[600],
          descHighlight02To: colors.sky[400]
        }
      }
    }
  },
  twitshorter: {
    links: {
      youtube: "https://www.youtube.com/embed/fsQeWjex0Xg",

      github:
        "https://github.com/kant01ne/browser-extensions/tree/main/apps/twitshorter",
      twitter: "https://twitter.com/kant01ne"
    },
    name: "TwitShorter",
    extensions: {
      Chrome:
        "https://chrome.google.com/webstore/detail/kdmhppbhoolbfkmfegijgkaffnpellhh/preview?hl=en&authuser=0"
    },
    longDescription:
      "An open source browser extension to query ChatGPT with the current page context.",
    description: {
      start: "Shorten any",
      highlight01: "long",
      middle: "twitter",
      highlight02: "threads"
    },
    logo: twitShorterLogo,
    tailwind: {
      colors: {
        brand: {
          bgFrom: "#1DA1F2", // Twitter blue
          bgTo: colors.blue[900],
          DEFAULT: colors.white,
          descHighlight01From: colors.amber[600],
          descHighlight01To: colors.orange[300],
          descHighlight02To: colors.yellow[200],
          descHighlight02From: colors.amber[400]
        }
      }
    }
  }
}
