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

@controller('/api/v1/adverts')
export class AdvertController implements interfaces.Controller {
  public _userRepo: User;
  public constructor(@inject(TYPE.UserModel) userRepo: User) {
    this._userRepo = userRepo;
  }
  @httpGet('/')
  public async get(@response() res: express.Response) {
    try {
      const adverts = await Advert.query();

      return res.status(200).json({
        status: 'success',
        data: {
          adverts,
        },
      });
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }

  @httpPost('/')
  public async createAdvert(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const { name, address, price, noOfRooms, user_id } = req.body;
    try {
      const advert = await Advert.query().insert({
        name,
        address,
        price,
        noOfRooms,
        user_id,
      });
      return res.status(200).json({
        status: 'success',
        data: {
          advert,
        },
      });
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }

  @httpGet('/:advert_id')
  public async getAdvertById(@request() req: express.Request,
  @response() res: express.Response) {
    const { advert_id } =req.body
    try {
      const advert = await Advert.query().findById(advert_id);

      return res.status(200).json({
        status: 'success',
        data: {
          advert,
        },
      });
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }
}
