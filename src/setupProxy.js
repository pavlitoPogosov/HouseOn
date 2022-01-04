/**
 * Этот файл настраивает проксирование запросов для дев-сервера create-react-app.
 * Подробнее тут: https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
 */

const proxy = require('http-proxy-middleware');
const { URL } = require('url');

const devApiProxy = process.env.DEV_API_PROXY;

function applyProxy(app, from, to) {
  const url = new URL(to);
  const pathname = url.pathname;
  const origin = url.origin;
  console.log(`Enabling proxy from '${from}' to '${origin}${pathname}'`);
  app.use(
    proxy(from, {
      target: origin,
      changeOrigin: true,
      pathRewrite: {
        ['^' + from]: pathname
      }
    })
  );
}

module.exports = (app) => {
  if (devApiProxy) {
    applyProxy(app, '/api', devApiProxy);
  }
};
