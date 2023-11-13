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
import Bid from './bids';
  
  class Advert extends mixins(Model) {
    // [x: string]: any;
  
    static tableName: string = 'adverts';
    public readonly id: string;
    public name: string;
    public address: ILocation;
    public price: number;
    public noOfRooms: number;
    public amenities: Array<Record<string, any>>
    public media: Array<Record<string, any>>
    public isClosed: boolean
    public user_id: string


  
    public created_at: Date | string;
  

    // static query(...args: any) {
    //     return super.query(...args).throwIfNotFound();
    //   }
    static relationMappings: RelationMappings | RelationMappingsThunk = {
      bids: {
        relation: Model.HasManyRelation,
        modelClass: Bid,
        join: {
          from: 'adverts.id',
          to: 'bid.advert_id'
        }
    }
    };
  }
  
  // export type UserT = ModelObject<User>
  export default Advert;
  