module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-trailing-spaces': 'error',
    quotes: [
      'error',
      'single'
    ],
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/comma-dangle': 'error',
    'vue/key-spacing': 'error',
    'vue/match-component-file-name': 'error',
    'vue/script-indent': 'error',
    'vue/attribute-hyphenation': 'off',
    'vue/prop-name-casing': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
