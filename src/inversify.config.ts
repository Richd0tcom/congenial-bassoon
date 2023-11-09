import { AsyncContainerModule } from 'inversify';

import User from './entities/users';
import { getRepository } from './repositories/movie_repository';
import { TYPE } from './constants/types';
import { ModelClass } from 'objection';
import './controllers/advert_controller';
import './controllers/bid_controller';
import Advert from './entities/adverts';
import Bid from './entities/bids';

export const bindings = new AsyncContainerModule(async (bind) => {
  await require('./controllers/user_controller');

  bind<User>(TYPE.UserModel).to(User).inRequestScope();
  bind<Advert>(TYPE.AdvertModel).to(Advert).inRequestScope();
  bind<Bid>(TYPE.AdvertModel).to(Bid).inRequestScope();
});
