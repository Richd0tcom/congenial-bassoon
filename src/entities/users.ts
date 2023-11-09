import {
  Model,
  ModelObject,
  RelationMappings,
  RelationMappingsThunk,
  mixin,
} from 'objection';
import mixins, { modelUnique, modelUuid } from '.';
import { ILocation, Role } from '../constants/interfaces';
import { DBErrors } from 'objection-db-errors';
import visibility from 'objection-visibility';
import { injectable } from 'inversify';

export interface IUser {

}
@injectable()
class User extends mixins(Model) {
  // [x: string]: any;

  static tableName: string = 'users';
  public readonly id: string;
  public name: string;
  public email: string;
  public role: Role;
  public location: ILocation | string;
  public wallet_balance: string;

  public created_at: Date | string;

  // static hidden = ['password'];
  // static query(...args: any) {
  //     return super.query(...args).throwIfNotFound();
  //   }
  static relationMappings: RelationMappings | RelationMappingsThunk = {};
}

// export type UserT = ModelObject<User>
export default User;
