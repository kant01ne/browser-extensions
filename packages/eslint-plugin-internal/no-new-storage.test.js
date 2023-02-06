// no-empty-catch.spec.js
const { RuleTester } = require("eslint")
const noEmptyCatchRule = require("./no-new-storage.js")
const ruleTester = new RuleTester()
ruleTester.run("no-new-storage", noEmptyCatchRule, {
  valid: [
    {
      code: "var storage = new PlasmoStorage()"
    }
  ],
  invalid: [
    {
      code: "var storage = new Storage()",
      // we can use messageId from the rule object
      errors: [{ messageId: "noNewStorage" }]
    }
  ]
})
