module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],

  globals: {
    jest: true,
    describe: true,
    it: true,
    expect: true,
    beforeEach: true
  },

  env: {
    browser: true,
    es6: true,
    node: true
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  settings: {
    react: {
      version: 'detect'
    }
  }
};
