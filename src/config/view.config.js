import ReactDOMServer from 'react-dom/server';
import {
  ExecutionContext,
  HttpExecutionContext,
} from './execution-context.config';

export const render = (/** @type {import('react').ReactElement} */ element) => {
  return /*html*/ `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(
    element
  )}`;
};

export const viewEngine = async (path, /** @type {any} */ options, cb) => {
  try {
    const { default: View } = await import(path);
    const rendered = render(<View {...options.props} />);

    cb(null, rendered);
  } catch (e) {
    cb(e);
  }
};

/**
 * @param {string} viewPath
 * @param {object} props
 */
export const view = (viewPath, props = {}) => {
  const ctx = ExecutionContext.getCurrent();

  if (!ctx) {
    throw new Error('Execution context is not set.');
  }

  if (!(ctx instanceof HttpExecutionContext)) {
    throw new Error('HTTP execution context is not set.');
  }

  const res = ctx.res;

  res.header('Content-Type', 'text/html');

  try {
    res.render(
      viewPath,
      {
        props,
      },
      (err, html) => {
        if (err) {
          res.render('errors/404');
          return;
        }

        res.send(html);
      }
    );
  } catch (e) {
    res.render('errors/404');
  }
};
