import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { errorResponse } from './errors/errorResponse';

export const app = express();

app.use(bodyParser.text({ defaultCharset: 'utf-8' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorMiddleware);

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

function errorMiddleware(error: any, _req: any, res: any, next: any) {
  return res.headersSent ? next(error) : errorResponse(res, _req);
}

function setupCloseOnExit(server: any) {
  // thank you stack overflow
  // https://stackoverflow.com/a/14032965/971592
  async function exitHandler(options: any = {}) {
    await server
      .close()
      .then(() => {
        console.info('Server successfully closed');
      })
      .catch((e: any) => {
        console.warn('Something went wrong closing the server', e.stack);
      });
    // eslint-disable-next-line no-process-exit
    if (options.exit) {
      return process.exit();
    } else {
      return;
    }
  }

  // do something when app is closing
  process.on('exit', exitHandler);

  // catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
}

export function start(port: number | string): Promise<unknown> {
  return new Promise((resolve) => {
    const server: any = app.listen(process.env.PORT || port, () => {
      console.info(
        `Express server started on  http://localhost:${server.address().port}`,
      );

      const originalClose = server.close.bind(server);
      // eslint-disable-next-line functional/immutable-data
      server.close = () => {
        return new Promise((resolveClose: Function) => {
          originalClose(resolveClose);
        });
      };
      setupCloseOnExit(server);
      resolve(server);
    });
  });
}
