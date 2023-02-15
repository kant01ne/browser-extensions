## ChatGPThing

Query ChatGPT in the context of the current page

[Website](https://browser-apps.vercel.app/chatgpthing&utm_source=github-repo)

[Install on Chrome](https://chrome.google.com/webstore/detail/chatgpthing/amiibkaljanlkpjljhlkgjdfemgkklbo?hl=en&authuser=0&utm_source=github-repo)

[Install on Firefox](https://addons.mozilla.org/en-US/firefox/addon/chatgpthing/?utm_source=github-repo)

<video src="https://user-images.githubusercontent.com/5072452/216819491-ae457647-6465-4fb8-864c-193a92dc1b48.mp4"></video>

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

## Contribution

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

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

## Welcome to Chatgpthing!

Thanks for installing Chatgpthing!

To get started, use the keyboard shortcut (`Alt+Z` or `Option+Z` by default) to open the tool on any page. Try it here!

<video src="https://user-images.githubusercontent.com/5072452/219022533-3c5f9465-b917-4347-8592-72e4cb7e997d.mov"></video>

On Windows:

<img src="https://user-images.githubusercontent.com/5072452/219045602-4d27db69-d076-43bc-a4d5-3e79dc5800d1.png" width="300" >

On MacOS:

<img src="https://user-images.githubusercontent.com/5072452/219045612-1868cca5-d885-4c25-8bfb-bab403a4562a.png" width="300" >

You can easily update the keyboard shortcut if you prefer a different one:

<vidoe src="https://user-images.githubusercontent.com/5072452/219024453-9bdcb212-8478-446e-bf53-de3badf7aa09.mov"></video>

Alternatively, you can also open the tool by clicking on the extension icon in the toolbar.

Make sure to pin the extension icon to your toolbar for easy access!

<video src="https://user-images.githubusercontent.com/5072452/219022968-0c6c4905-cc56-4644-b7b0-3644dbdc6bd4.mov"></video>

## Authenticating with open AI

To use the tool, you need to authenticate with Open AI. Click on the "link" in the box to login or signup to open AI.

From time to time, you may need to re-authenticate with Open AI or pass Cloudflare checks. These limitations are imposed by open AI.
You can do so by clicking on the "link" in the box.

<video src="https://user-images.githubusercontent.com/5072452/219024106-0180bd07-ad04-40bf-8263-2c35e4259082.mov"></video>

## Using the tool

Once you are authenticated, you can start using the tool. Simply type in your query and press enter to get a response from open AI.

The context of the page is automatically added to your query.

<video src="https://user-images.githubusercontent.com/5072452/219024899-9307e8ff-63bd-4590-ade1-49c4a1129a52.mov"></video>
