module.exports = {
  ignorePatterns: ['**/dist/**/*', '*.cjs'],

  env: {
    node: true
  },

  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next',
    'eslint:recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'turbo',
    'prettier'
  ],

  plugins: [
    'react',
    '@typescript-eslint',
    'tailwindcss'
  ],

  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },

  rules: {
    'semi': ['warn', 'never'],
    'curly': ['error', 'multi-line'],
    'no-console': ['off'],
    'max-len': ['warn', { ignoreComments: true }],
    '@typescript-eslint/no-explicit-any': ['off'],
    'react/jsx-indent': [2, 2],
    'tailwindcss/no-custom-classname': ['off']
  },
};
