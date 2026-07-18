module.exports = {
  root: true,
  extends: ['expo', 'prettier'],
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        paths: ['.'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      alias: {
        map: [['@', '.']],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'import/no-unresolved': ['error', { ignore: ['^@/'] }],
  },
};