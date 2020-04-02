module.exports = {
  "env": {
      "browser": true,
      "node": true,
      "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaVersion": 2019,
      "sourceType": "module"
  },
  "rules": {
      "semi": ["error", "always"],
      "quotes": ["error", "single"]
  }
};
