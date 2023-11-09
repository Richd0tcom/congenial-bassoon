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
  request
} from 'inversify-express-utils';

import User, { IUser } from '../entities/users';
import { TYPE } from '../constants/types';
import { ModelClass } from 'objection';

@controller('/api/v1/users')
export class UserController implements interfaces.Controller {
  public _userRepo: User
  public constructor(@inject(TYPE.UserModel) userRepo: User) {
    this._userRepo = userRepo
  }
  @httpGet('/')
  public async get(@response() res: express.Response) {
    try {
      return res.status(200).json({
        message: "were live"
      })
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }

  @httpPost('/')
  public async createUser(@request() req: express.Request, @response() res: express.Response){
    const { name, role,email  } = req.body
    try {
      const user = await User.query().insert({name, role, email})
      return res.status(200).json({
        status: 'success',
        data: {
          user
        }
      })
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }
}