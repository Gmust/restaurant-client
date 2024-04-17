module.exports = {
  extends: ['next', 'prettier', 'plugin:testing-library/react', 'plugin:jest-dom/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  env: {
    es6: true,
  },
  plugins: ['simple-import-sort', 'import'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
