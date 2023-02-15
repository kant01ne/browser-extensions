# browser-extensions monorepo

This monorepo contains all the browser extensions I built and will build in the near future.

It uses built using the incredible browser extension platform [Plasmo](https://plasmo.com). It uses [Next.js](https://nextjs.org/) for the landing page,[tailwind](https://tailwindcss.com/) and [shadcn/ui](https://github.com/shadcn/ui) components for the UI. The extension uses [trpc](https://trpc.io/) for Typesafe APIs with the help of [trpc-chrome](https://github.com/jlalmes/trpc-chrome).

## Note on Performance

> **Warning**
> This monorepo serves as an example building one or multiple browser extensions.

> If you see something broken, you can ping me [@kant01ne](https://twitter.com/kant01ne).

## ChatGPThing

Query ChatGPT in the context of the current page

[Website](https://browser-apps.vercel.app/chatgpthing&utm_source=github-repo)

[Install on Chrome](https://chrome.google.com/webstore/detail/chatgpthing/amiibkaljanlkpjljhlkgjdfemgkklbo?hl=en&authuser=0&utm_source=github-repo)

[Install on Firefox](https://addons.mozilla.org/en-US/firefox/addon/chatgpthing/?utm_source=github-repo)

<video src="https://user-images.githubusercontent.com/5072452/216819491-ae457647-6465-4fb8-864c-193a92dc1b48.mp4"></video>

## TwitShorter

Long tweets summarizer

[Website](https://browser-apps.vercel.app/chatgpthing&utm_source=github-repo)

[Install on Chrome](https://chrome.google.com/webstore/detail/kdmhppbhoolbfkmfegijgkaffnpellhh/preview?hl=en&authuser=0&utm_source=github-repo)

[Install on Firefox](https://addons.mozilla.org/en-US/firefox/addon/chatgpthing/?utm_source=github-repo)

<video src="https://user-images.githubusercontent.com/5072452/218632182-9fb7eeba-d238-44ad-ae86-1c816c387ba7.mp4"></video>

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/sites/apps:

### Apps and Packages

- `sites/web-chatgpthing`: a [Next.js](https://nextjs.org/) app that contains the source code of the [ChatGPThing landing page](https://chatgpthing.vercel.app/)
- `apps/chatgpthing`: A Browser extension that lets you query ChatGPT on any website with the context of the current page.
- `packages/ui`: a stub React component library shared between the apps and websites.
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd browser-extensions
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd browser-extensions
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
