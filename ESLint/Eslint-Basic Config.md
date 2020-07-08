# Reference Config

## Config

```js
{
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "extends": [
            "eslint:recommended",
            "react-app",
            "plugin:@typescript-eslint/eslint-recommended",
            "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2018
    },
    "plugins": [
        "react-hooks",
        "@typescript-eslint"
    ],
    "rules": {
        "indent": [
            0,
            8,
            {"FunctionExpression": {"body": 1, "parameters": "first"}}
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single",
            {"allowTemplateLiterals": true}
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "error",
            {"allow": ["log", "error"]}
        ],
        "no-empty": [
            "error",
            {"allowEmptyCatch": true}
        ],
        "require-yield": [
            0
        ],
        "no-constant-condition": [
            0,
            {"checkLoops": false}
        ],
        "no-unused-vars": ["error", {"args": "none"}],
        "require-atomic-updates": [0],
        "no-var": [0],
        "prefer-const": [0],

        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        "@typescript-eslint/no-explicit-any": [0],
        "@typescript-eslint/no-var-requires": [0],
        "@typescript-eslint/camelcase": [0],
        "@typescript-eslint/explicit-function-return-type": [0],
        "@typescript-eslint/no-use-before-define": [0],
        "@typescript-eslint/no-unused-vars": ["error", {"args": "none"}]

    },
    "globals": {
        "_":    true
    }
}


```