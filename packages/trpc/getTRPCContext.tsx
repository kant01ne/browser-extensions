import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createTRPCProxyClient } from "@trpc/client"
import { AnyRouter } from "@trpc/server"
import React from "react"
import { chromeLink } from "trpc-chrome/link"
import { v4 as uuidv4 } from "uuid"
import browser from "webextension-polyfill"

export function getTRPCContext<TRouter extends AnyRouter>(): {
  withTRPC: <TRouter extends AnyRouter>(
    Component: React.FC
  ) => <TRouter extends AnyRouter>() => JSX.Element
  useTRPC: () => {
    trpc?: ReturnType<typeof createTRPCProxyClient<TRouter>>
    queryClient?: QueryClient
    port?: browser.runtime.Port
  }
  TRPCProvider: React.FC<{
    children: React.ReactNode
    queryClient: QueryClient
    trpc?: ReturnType<typeof createTRPCProxyClient<TRouter>>
    port?: browser.runtime.Port
  }>
} {
  const id = uuidv4()
  const withTRPC =
    <TRouter extends AnyRouter>(Component: React.FC) =>
    <TRouter extends AnyRouter>(): JSX.Element => {
      /*
       * States.
       */
      const [queryClient] = React.useState(() => new QueryClient())
      const [port] = React.useState(() =>
        browser.runtime.connect({
          name: id
        })
      )
      const [trpc] = React.useState(() =>
        createTRPCProxyClient<TRouter extends AnyRouter ? TRouter : AnyRouter>({
          links: [chromeLink({ port })]
        })
      )

      /*
       * Effects.
       */
      React.useEffect(() => {
        return () => {
          port.disconnect()
        }
      }, [port])

      /*
       * Render.
       */
      return (
        <TRPCProvider port={port} queryClient={queryClient} trpc={trpc}>
          <QueryClientProvider client={queryClient}>
            <Component />
          </QueryClientProvider>
        </TRPCProvider>
      )
    }

  type TRPCProviderType = {
    trpc?: ReturnType<typeof createTRPCProxyClient<TRouter>>
    queryClient?: QueryClient
    port?: browser.runtime.Port
  }

  const TRPCContext = React.createContext<TRPCProviderType>({})

  const TRPCProvider: React.FC<{
    children: React.ReactNode
    queryClient: QueryClient
    trpc?: ReturnType<typeof createTRPCProxyClient<TRouter>>
    port?: browser.runtime.Port
  }> = ({ children, ...props }) => {
    return <TRPCContext.Provider value={props}>{children}</TRPCContext.Provider>
  }

  const useTRPC = (): TRPCProviderType => React.useContext(TRPCContext)
  return { withTRPC, useTRPC, TRPCProvider }
}
