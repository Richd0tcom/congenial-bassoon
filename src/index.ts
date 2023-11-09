import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { bindings } from './inversify.config';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';

dotenv.config();

(async () => {
  const port = 3000;
  const container = new Container({
    skipBaseClassChecks: true,
  });
  await container.loadAsync(bindings);
  const app = new InversifyExpressServer(container);
  app.setConfig((app) => {
    // add body parser
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(express.json());
  });
  const server = app.build();

  server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
  });
})();
