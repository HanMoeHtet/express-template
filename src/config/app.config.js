// import cookieParser from 'cookie-parser';
import { consoleLogger } from '@src/config/logger.config';
import router from '@src/config/router.config';
import { handler as errorHandler } from '@src/http/exceptions/handler';
import { HttpException } from '@src/http/exceptions/http.exception';
import { HttpStatus } from '@src/http/http-status.js';
import { initExecutionContext } from '@src/http/middlewares/execution-context.middleware.js';
import { i18nextMiddleware } from '@src/http/middlewares/i18next.middleware.js';
import { rateLimitByIp } from '@src/http/middlewares/rate-limitter.middleware';
import { requestIdentifier } from '@src/http/middlewares/request-identifier.middleware.js';
import { requestLogger } from '@src/http/middlewares/request-logger.middleware';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { corsOptions } from './cors.config.js';
import { ENV, PORT } from './env.config.js';
import { publicPath } from './paths.config.js';

// Instantiate express app
const app = express();

// Set execution context for each request
app.use(initExecutionContext);

// @ts-ignore
// Use gzip compression
app.use(compression());

// Helmet for web security
app.use(helmet());

// Configure CORS settings
app.use(cors(corsOptions));

// Parse JSON body
app.use(express.json());

// Parse URL-encoded body such as form submissions
app.use(express.urlencoded({ extended: false }));

// Parse cookies
// app.use(cookieParser());

// Global middlewares
app.use([rateLimitByIp, requestIdentifier, requestLogger, i18nextMiddleware]);

// Serve static files
app.use(express.static(publicPath));

// Set up routes
app.use(router);

// Catch-all route to handle 404 or serve PWA apps
app.use('*', function catchAll() {
  throw new HttpException(HttpStatus.NOT_FOUND);
});

// Custom error handler
app.use(errorHandler);

// Set port for the app
app.set('port', PORT);

// Create http server
const server = createServer(app);

server.on(
  'error',
  (/** @type  {Error & { syscall: string; code: string; }}  */ error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        return;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        return;
      default:
        throw error;
    }
  }
);

server.on('listening', () => {
  const address = server.address();

  if (address === null) {
    throw new Error('Invalid server address.');
  }

  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;

  ENV === 'development' && consoleLogger.info('Listening on ' + bind);
});

export const init = () => {
  // Listen on port, on all network interfaces.
  return new Promise((resolve) => {
    server.listen(PORT, () => {
      resolve(null);
    });
  });
};

export const close = () => {
  return new Promise((resolve) => {
    server.close(() => resolve(null));
  });
};

export { app, server };
