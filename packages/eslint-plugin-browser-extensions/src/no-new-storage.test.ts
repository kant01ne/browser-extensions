import { RuleTester } from "eslint"

// eslint-disable-next-line no-restricted-imports
import noNewStorageRule from "./no-new-storage"

const ruleTester = new RuleTester()
ruleTester.run("no-new-storage", noNewStorageRule, {
  invalid: [
    {
      code: "var storage = new Storage()",
      // we can use messageId from the rule object
      errors: [{ messageId: "noNewStorage" }]
    }
  ],
  valid: [
    {
      code: "var storage = new PlasmoStorage()"
    }
  ]
})
