module.exports = {
  root: true,

  env: {
    node: true,
    es2021: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  plugins: ['@typescript-eslint', 'prettier'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],

  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-misused-promises': 'off',
  },
};
