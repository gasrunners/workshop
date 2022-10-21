module.exports = {
  env: {
    node: true
  },

  extends: [
    "eslint:recommended",
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    "next",
    "turbo",
    "prettier"
  ],

  plugins: [
    '@typescript-eslint',
    'react',
    'tailwindcss'
  ],

  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },

  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "curly": ["error", "multi-line"],
    "vue/multi-word-component-names": ["off"],
    "no-console": ["off"],
    "max-len": ["warn", { ignoreComments: true }],
    "@typescript-eslint/no-explicit-any": ["off"]
  },
};
