/* eslint-disable sort-keys-fix/sort-keys-fix */
const localConfigPath = './eslintrc.local';

const basic = {
  extends: 'react-app',
  plugins: [ 'unused-imports' ],
  rules: {
    'no-unused-vars': 'off',
    'no-mixed-operators': 'off',
    'no-console': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'no-restricted-imports': [ 'error', {
      patterns: [
        '../**/assets/*',
        '*/assets/*',
        '../**/common/*',
        '*/common/*',
        '../**/graphql/*',
        '*/graphql/*',
        '../**/redux/*',
        '*/redux/*',
        '../**/routes/*',
        '*/routes/*',
        '../**/styles/*',
        '*/styles/*',
        '../**/utils/*',
        '*/utils/*',
        '../**/variables/*',
        '*/variables/*'
      ]
    } ],
    curly: [ 'warn', 'multi-line' ],
    'import/order': [ 'error', {
      alphabetize: { order: 'asc', caseInsensitive: true },
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      pathGroups: [
        {
          pattern: 'react*',
          group: 'external',
          position: 'before'
        },
        {
          pattern: '*',
          group: 'external',
          position: 'before'
        },
        {
          pattern: './*.[^scss]',
          group: 'index',
          position: 'before'
        },
        {
          pattern: './*.module.scss',
          group: 'index',
          position: 'after'
        },
      ],
      pathGroupsExcludedImportTypes: [ 'react' ],
      'newlines-between': 'always'
    } ]
  },
  overrides: [ {
    files: [ '**/*.ts?(x)' ],
    rules: { '@typescript-eslint/no-unused-vars': 'off' }
  } ]
};

/*
  Возможность для подключения локального конфига линтера.
  Локальный конфиг не будет влиять на код внутри проекта,
  т.к. при каждом коммите производится lint --fix глобальным конфигом.
 */

function config() {
  const isDevBuild = process.env.NODE_ENV === 'development';
  const stagingArgs = process.env.npm_config_argv;
  const isStaging = stagingArgs && String(stagingArgs).includes('staged');

  try {
    const localConfig = require(localConfigPath);

    if (!isDevBuild && !isStaging) {
      return localConfig;
    }
    return basic;
  } catch (e) {
    return basic;
  }
}

module.exports = config();
/* eslint-enable sort-keys-fix/sort-keys-fix */
