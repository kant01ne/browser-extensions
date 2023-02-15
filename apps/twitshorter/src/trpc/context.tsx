import type { AppRouter } from "@/trpc/router"
import { getTRPCContext } from "trpc/getTRPCContext"

const context = getTRPCContext<AppRouter>()
export const useTRPC = context.useTRPC
export const withTRPC = context.withTRPC
