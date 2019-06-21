module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:eslint-comments/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:promise/recommended",
    "react-app",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: "./tsconfig.json",
    tsconfigRootDir: "./",
  },
  plugins: ["@typescript-eslint", "promise", "emotion"],
  rules: {
    // #region base eslint rules
    "no-empty-function": ["error"],
    "no-underscore-dangle": ["off"],
    "sort-keys": ["error"],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],

    // https://eslint.org/docs/rules/#possible-errors
    "no-async-promise-executor": "error",
    "no-await-in-loop": "error",
    "no-misleading-character-class": "error",
    "no-template-curly-in-string": "error",
    "require-atomic-updates": "error",

    // https://eslint.org/docs/rules/#best-practices
    "no-caller": "error",
    "no-continue": ["off"],
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-implicit-coercion": ["error", { allow: ["!!", "+"] }],
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-iterator": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-catch": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "no-with": "error",
    radix: "error",
    yoda: "error",

    strict: "error",

    // https://eslint.org/docs/rules/#variables
    "no-label-var": "error",
    "no-restricted-globals": ["error", "name"],
    "no-shadow-restricted-names": "error",
    "no-undef-init": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "local",
        args: "all",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        caughtErrors: "all",
      },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: false,
        classes: false,
        variables: false,
        typedefs: false,
      },
    ],

    // https://eslint.org/docs/rules/#variables
    "no-buffer-constructor": "error",
    "no-path-concat": "error",

    // https://eslint.org/docs/rules/#nodejs-and-commonjs
    "no-new-require": "error",

    // https://eslint.org/docs/rules/#stylistic-issues
    "@typescript-eslint/camelcase": "error",
    "@typescript-eslint/no-array-constructor": "error",
    "no-new-object": "error",
    "one-var": ["error", "never"],
    "prefer-object-spread": "error",

    // https://eslint.org/docs/rules/#ecmascript-6
    "no-useless-computed-key": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-const": "error",
    "prefer-numeric-literals": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    // #endregion

    // #region typescript
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/class-name-casing": ["error"],
    "@typescript-eslint/class-name-casing": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-member-accessibility": ["off"],
    "@typescript-eslint/interface-name-prefix": ["error", "never"],
    "@typescript-eslint/member-naming": ["error", { private: "^_" }],
    "@typescript-eslint/member-ordering": ["off"],
    "@typescript-eslint/no-angle-bracket-type-assertion": ["error"],
    "@typescript-eslint/no-extraneous-class": ["error"],
    "@typescript-eslint/no-inferrable-types": ["error"],
    "@typescript-eslint/no-misused-new": ["error"],
    "@typescript-eslint/no-object-literal-type-assertion": ["error"],
    "@typescript-eslint/no-require-imports": ["error"],
    "@typescript-eslint/no-this-alias": ["error"],
    "@typescript-eslint/no-unnecessary-qualifier": ["warn"],
    "@typescript-eslint/no-unnecessary-type-assertion": ["warn"],
    "@typescript-eslint/no-useless-constructor": ["error"],
    "@typescript-eslint/prefer-includes": ["warn"],
    "@typescript-eslint/prefer-interface": ["error"],
    "@typescript-eslint/prefer-interface": ["off"],
    "@typescript-eslint/unified-signatures": ["warn"],
    // #endregion

    // #region emotion
    "emotion/syntax-preference": ["error", "string"],
    // #endregion

    // #region import
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/__docs__/**/*.ts",
          "**/__docs__/**/*.tsx",
          "**/__tests__/*.ts",
          "**/__tests__/*.tsx",
          "*.test.ts",
          "*.test.tsx",
          "doczrc.js",
          "rollup.config.js",
        ],
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
    "import/prefer-default-export": ["off"],
    // #endregion

    // #region react
    "react/no-unescaped-entities": ["off"],
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", ".tsx"] },
    ],

    "react/button-has-type": "error",
    "react/destructuring-assignment": "error",
    "react/no-access-state-in-setstate": "error",
    "react/no-danger": "error",
    "react/no-typos": "error",
    "react/no-this-in-sfc": "error",
    "react/no-unsafe": ["error", { checkAliases: true }],
    "react/no-unused-prop-types": "error",
    "react/no-unused-state": "error",
    "react/prefer-es6-class": "error",
    "react/prefer-stateless-function": "error",
    "react/prop-types": ["error", { skipUndeclared: true }],
    "react/self-closing-comp": "error",
    "react/void-dom-elements-no-children": "error",
    // #endregion

    // #region jsx
    "react/jsx-boolean-value": "error",
    "react/jsx-handler-names": "error",
    "react/jsx-max-depth": ["error", { max: 7 }],
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-pascal-case": "error",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],
    // #endregion
  },
  settings: {
    "import/resolver": { node: { moduleDirectory: ["node_modules", "."] } },
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
  },
};
