module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],

  globals: {
    describe: true,
    it: true,
    expect: true,
    beforeEach: true
  },

  env: {
    browser: true,
    es6: true
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
