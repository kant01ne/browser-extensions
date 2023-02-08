module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "sort-keys-fix",
    "react",
    "browser-extensions"
  ], //, "internal"
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true }
    ],
    "browser-extensions/no-new-storage": "error",
    "import/no-named-as-default-member": "off",
    "no-console": "error",

    "no-debugger": "error",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            message:
              "To reduce bundle size please use modularized imports: import maxBy from 'lodash-es/maxBy' instead.",
            name: "lodash-es"
          }
        ]
        // patterns: [".*"]
      }
    ],
    "no-restricted-syntax": [
      "error",
      {
        message:
          "Do not use `React.useLayoutEffect` directly, use useIsomorphicLayoutEffect wrapper instead",
        selector:
          "MemberExpression[object.name='React'][property.name='useLayoutEffect']"
      },
      {
        message:
          'Do not use `replaceAll` in nextjs, use .replace(/-/g, " ") instead, see https://stackoverflow.com/questions/62940927/cant-use-replaceall-or-replace-with-nextjs-reactjs',
        selector: "[property.name='replaceAll']"
      }
    ],
    "react/display-name": "off",
    "react/jsx-key": "off",
    "react/jsx-sort-props": "error",
    "react/prop-types": "off",
    "sort-keys-fix/sort-keys-fix": "warn"
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
}
