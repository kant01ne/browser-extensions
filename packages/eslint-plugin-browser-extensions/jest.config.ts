import type { Config } from "jest"

export default async (): Promise<Config> => {
  return {
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    verbose: true
  }
}
