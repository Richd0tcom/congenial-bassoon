import 'reflect-metadata';
import { Container } from 'inversify';
import {
  InversifyExpressServer,
  TYPE,
  interfaces,
} from 'inversify-express-utils';
import { bindings } from './inversify.config';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';

import * as swagger from 'swagger-express-ts';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';
import { VersionController } from './controllers/version_controller';
import User from './entities/users';
const defi = require('../docs/swagger/swaggger.json');
dotenv.config();

(async () => {
  const port = 3000;
  const container = new Container({
    skipBaseClassChecks: true,
  });

  // container.bind<interfaces.Controller> ( TYPE.Controller )
  //   .to( VersionController ).inSingletonScope().whenTargetNamed( VersionController.TARGET_NAME );
  await container.loadAsync(bindings);
  const app = new InversifyExpressServer(container);
  app.setConfig((app) => {
    app.use('/docs/swagger', express.static('./docs/swagger'));
    app.use(
      '/docs/swagger/assets',
      express.static('./node_modules/swagger-ui-dist')
    );
    // add body parser
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(express.json());

    app.use(
      swagger.express({
        path: '/docs',
        definition : {
            info : {
                title : "My api" ,
                version : "1.0"
            } ,
            externalDocs : {
                url : "/docs/swagger"
            },
            // Models can be defined here
           models : {
            user: {
              description: "User model",
              properties: {
                
              }
            }
           }
        }
      })
    );
  });
  const server = app.build();

  server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
  });
})();
