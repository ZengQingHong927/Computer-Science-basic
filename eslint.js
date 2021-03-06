Eslintrc

{
  "parser": "babel-eslint",
  "rules": {
    "comma-dangle": 0,
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1
      }
    ],
    "jsx-quotes": 1,
    "linebreak-style": [
      2,
      "unix"
    ],
    "quotes": [
      2,
      "single"
    ],
    "react/display-name": 1,
    "react/forbid-prop-types": 0,
    "react/sort-prop-types": 1,
    "react/jsx-boolean-value": 1,
    "react/jsx-first-prop-new-line": [
      1,
      "multiline"
    ],
    "react/jsx-closing-bracket-location": 1,
    "react/jsx-curly-spacing": 1,
    "react/jsx-indent-props": [
      2,
      2
    ],
    "react/jsx-max-props-per-line": 1,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-sort-props": 1,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/no-danger": 1,
    "react/no-did-mount-set-state": 0,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-set-state": 1,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 1,
    "react/react-in-jsx-scope": 1,
    "react/self-closing-comp": 1,
    "react/sort-comp": 0,
    "semi": 0
  },
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "eslint:recommended",
  "ecmaFeatures": {
    "jsx": true,
    "experimentalObjectRestSpread": true
  },
  "plugins": [
    "react"
  ]
}

Package.json
"eslintConfig": {
    "extends": "react-app"
  },

"devDependencies": {
    "eslint": "^6.6.0",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-react": "^7.12.4",
    "prettier": "^1.17.1",
    "prettier-eslint": "^8.8.2",
    "prettier-eslint-cli": "^4.7.1",
    "typescript": "^3.5.1"
  }

// MD5js
// new md5js ().update (pwd).digest ('hex');