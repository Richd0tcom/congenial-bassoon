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
  httpPut,
} from 'inversify-express-utils';

import User, { IUser } from '../entities/users';
import { TYPE } from '../constants/types';
import { ModelClass } from 'objection';
import Advert from '../entities/adverts';
import Bid from '../entities/bids';
import { BidStatus } from '../constants/interfaces';
import { createTransactionForBid } from '../service/transaction_service';

@controller('/api/v1/bids')
export class BidController implements interfaces.Controller {
  public _userRepo: User;
  public constructor(@inject(TYPE.UserModel) userRepo: User) {
    this._userRepo = userRepo;
  }
  @httpGet('/:bid_id')
  public async getById(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const { bid_id } = req.params;
    try {
      const bid = await Bid.query().findById(bid_id);

      return res.status(200).json({
        status: 'success',
        data: {
          bid,
        },
      });
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }

  @httpPut('/accept')
  public async acceptBid(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const { bid_id } = req.body;
    try {
      let bid = await Bid.query().findById(bid_id);
      
      if (!bid) {
        throw new Error('Invalid bid');
      }

      let advert = await Advert.query().findById(bid.advert_id);

      if (!advert) {
        throw new Error('Invalid b');
      }
      await createTransactionForBid(
        String(bid.amount),
        bid.user_id,
        advert.user_id,
        'Payment for bid',
        'Payment for bid'
      );
      bid = await Bid.query().patchAndFetchById(bid_id, {
        status: BidStatus.ACCEPTED,
      });

      await Advert.query().patchAndFetchById(bid.advert_id, {
        isClosed: true,
      });
      return res.status(200).json({
        status: 'success',
        data: {
          bid,
        },
      });
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }

  @httpPost('/')
  public async createBid(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const { amount, advert_id, user_id } = req.body;
    try {
      const advert = await Advert.query().findById(advert_id);

      if (!advert) {
        throw new Error('Advert not found');
      }

      if (!advert.isClosed) {
        throw new Error('This advert has been sold out');
      }
      const bid = await Bid.query().insert({
        amount,
        advert_id,
        user_id,
      });

      return res.status(200).json({
        status: 'success',
        data: {
          bid,
        },
      });
    } catch (e: any) {
      res.status(500);
      res.send(e.message);
    }
  }
}
