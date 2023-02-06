import type { AppRouter } from "@/background"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createTRPCProxyClient } from "@trpc/client"
import React from "react"
import { chromeLink } from "trpc-chrome/link"
import { v4 as uuidv4 } from "uuid"
import browser from "webextension-polyfill"

const id = uuidv4()
export const withTRPC = (Component: React.FC) => (): JSX.Element => {
  const [queryClient] = React.useState(() => new QueryClient())
  const [port] = React.useState(() =>
    browser.runtime.connect({
      name: id
    })
  )
  const [trpc] = React.useState(() =>
    createTRPCProxyClient<AppRouter>({
      links: [chromeLink({ port })]
    })
  )

  React.useEffect(() => {
    return () => {
      port.disconnect()
    }
  }, [])

  return (
    <TRPCProvider port={port} queryClient={queryClient} trpc={trpc}>
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    </TRPCProvider>
  )
}

type TRPCProviderType = {
  trpc?: ReturnType<typeof createTRPCProxyClient<AppRouter>>
  queryClient?: QueryClient
  port?: browser.runtime.Port
}

const TRPCContext = React.createContext<TRPCProviderType>({})

const TRPCProvider: React.FC<{
  children: React.ReactNode
  queryClient: QueryClient
  trpc?: ReturnType<typeof createTRPCProxyClient<AppRouter>>
  port?: browser.runtime.Port
}> = ({ children, ...props }) => {
  return <TRPCContext.Provider value={props}>{children}</TRPCContext.Provider>
}

export const useTRPC = (): TRPCProviderType => React.useContext(TRPCContext)
