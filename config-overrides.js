/**
 * Этот файл автоматически выполняется благодаря react-app-rewired
 *
 * Он позволяет модифицировать конфигурацию webpack из create-react-app
 */
const path = require('path');
const fs = require('fs');
const { override, overrideDevServer, addWebpackAlias } = require('customize-cra');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Отключаем postcss-merge-rules из-за проблем с focus-visible
 *
 * Подробнее: https://github.com/cssnano/cssnano/issues/932
 * В версии cssnano 4.10 ещё не исправлено
 */
const disableMergeRules = (config) => {
  const plugins = config.optimization.minimizer;
  const iPlugin = plugins.findIndex(
    (p) => p instanceof OptimizeCSSAssetsPlugin
  );
  if (iPlugin === -1) {
    throw new Error('Unexpected CRA config. Exiting.');
  }

  // Copy-pasted from https://github.com/facebook/create-react-app/blob/5fc8350c89ff730cdfd067bbd86a90dab393d21b/packages/react-scripts/config/webpack.config.js#L289
  const newPlugin = new OptimizeCSSAssetsPlugin({
    cssProcessorOptions: {
      parser: safePostCssParser,
      map: {
        // `inline: false` forces the sourcemap to be output into a
        // separate file
        inline: false,
        // `annotation: true` appends the sourceMappingURL to the end of
        // the css file, helping the browser find the sourcemap
        annotation: true
      }
    },
    cssProcessorPluginOptions: {
      preset: [
        'default',
        {
          minifyFontValues: { removeQuotes: false },
          // Изменение по сравнению с оригинальным конфигом:
          mergeRules: false
        }
      ]
    }
  });

  plugins.splice(iPlugin, 1, newPlugin);

  return config;
};

/**
 * Подключаем source-map-loader, чтобы подгружались
 * соурсмепы зависимостей из node_modules/@proscom
 *
 * Подробнее: https://github.com/facebook/create-react-app/issues/8071
 */
const updateWebpackModuleRules = (config) => {
  console.log('Setting up source map loading from node_modules');

  const rules = config.module.rules;
  if (rules.length !== 2) {
    throw new Error('Unexpected CRA config. Exiting.');
  }

  const sourceMapLoader = {
    enforce: 'pre',
    exclude: /@babel(?:\/|\\{1,2})runtime/,
    test: /\.(js|mjs|jsx|ts|tsx|css)$/,
    use: {
      loader: '@proscom/source-map-loader',
      options: {
        skipResource: (loaderContext, url) => {
          return !(
            // Список пакетов, из которых надо грузить сорусмепы:
            loaderContext.context.match(/node_modules[\\/]@proscom/)
          );
        },
        skipSourceUrl: (context, url) => {
          return url === '<no source>';
        }
      }
    }
  };

  rules.splice(1, 0, sourceMapLoader);

  return config;
};

/**
 * Подписываемся на изменения пакетов @proscom из node_modules.
 * Это позволяет пересобирать проект при изменении зависимостей.
 * Полезно при локальной разработке зависимостей с использованием yalc.
 */
const watchProscomNodeModules = (config) => {
  if (process.env.WATCH_NODE_MODULES_PROSCOM !== 'true') {
    return config;
  }

  console.log('Setting up watching for node_modules/@proscom changes');

  const appDirectory = fs.realpathSync(process.cwd());
  const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
  const appSrc = resolveApp('src');

  function ignoredFiles(appSrc) {
    return new RegExp(
      `^(?!${escape(
        path.normalize(appSrc + '/').replace(/[\\]+/g, '/')
      )}).+/node_modules/(?!@proscom)`,
      'g'
    );
  }

  config.watchOptions.ignored = ignoredFiles(appSrc);

  return config;
};

const webpackAlias = addWebpackAlias({
  'src': path.resolve(__dirname, 'src')
})

module.exports = {
  webpack: override(updateWebpackModuleRules, disableMergeRules, webpackAlias),
  devServer: overrideDevServer(watchProscomNodeModules),
};
