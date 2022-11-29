module.exports = {
  env: {
    es2021: true,
  },
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
}
