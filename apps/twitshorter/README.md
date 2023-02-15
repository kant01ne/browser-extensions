## TwitShorter

Long tweets summarizer

[Website](https://browser-apps.vercel.app/twitshorter&utm_source=github-repo)

[Install on Chrome](https://chrome.google.com/webstore/detail/kdmhppbhoolbfkmfegijgkaffnpellhh/?hl=en&authuser=0&utm_source=github-repo)

[Install on Firefox](https://addons.mozilla.org/en-US/firefox/addon/chatgpthing/?utm_source=github-repo)

<video src="https://user-images.githubusercontent.com/5072452/218632182-9fb7eeba-d238-44ad-ae86-1c816c387ba7.mp4"></video>

## Contribution

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!

# Onboarding

## Welcome to TwitShorter!

Thanks for installing TwitShorter. This tool will help you summarize long twitter threads.

## Authenticating with open AI

To use the tool, you need to authenticate with Open AI. Click on the "link" in the box to login or signup to open AI.

From time to time, you may need to re-authenticate with Open AI or pass Cloudflare checks. These limitations are imposed by open AI.
You can do so by clicking on the "link" in the box.

<video src="https://user-images.githubusercontent.com/5072452/219030098-11ff6461-ccfc-4a5e-ac9e-8f89805c63f0.mp4"></video>

## Using the tool

Once you are authenticated, you can start using the tool. simply open on any twitter threads and click on the Play button in the box to start summarizing long threads.

<video src="https://user-images.githubusercontent.com/5072452/219025645-21fb44c0-3884-4079-8fb5-f5d413d8013c.mov"></video>
