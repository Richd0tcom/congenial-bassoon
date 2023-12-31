import * as express from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  response,
  requestParam,
  requestBody,
  interfaces,
  request,
} from 'inversify-express-utils';

import User, { IUser } from '../entities/users';
import { TYPE } from '../constants/types';
import { ModelClass } from 'objection';
import {
  ApiOperationGet,
  ApiPath,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';

@ApiPath({
  path: '/users',
  name: 'User',
  security: { basicAuth: [] },
})
@controller('/api/v1/users')
export class UserController implements interfaces.Controller {
  public _userRepo: User;
  public constructor(@inject(TYPE.UserModel) userRepo: User) {
    this._userRepo = userRepo;
  }

  @httpPost('/')
  public async createUser(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const { name, role, email } = req.body;
    try {
      const user = await User.query().insert({ name, role, email });
      return res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }


  @ApiOperationGet({
    description: 'Get user by id',
    summary: 'Get versions list',
    responses: {
      200: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: 'user',
      },
    },
    
  })
  @httpGet('/:user_id')
  public async get(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const { user_id } = req.params;
    try {
      const user = await User.query().findById(user_id);
      return res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }
}
