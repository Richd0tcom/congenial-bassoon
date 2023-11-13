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
import Advert from '../entities/adverts';
import { Transaction } from '../entities/transactions';

@controller('/api/v1/transactions')
export class TransactionController implements interfaces.Controller {
  public _userRepo: User;
  public constructor(@inject(TYPE.UserModel) userRepo: User) {
    this._userRepo = userRepo;
  }
  @httpGet('/:user_id')
  public async get(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const { user_id } = req.params;
    try {
      const transactions = await Transaction.query().where({
        user_id,
      });

      return res.status(200).json({
        status: 'success',
        data: {
          transactions,
        },
      });
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }

}
