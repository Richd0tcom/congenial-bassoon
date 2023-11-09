import {
    Model,
    ModelObject,
    RelationMappings,
    RelationMappingsThunk,
    mixin,
  } from 'objection';
  import mixins, { modelUnique, modelUuid } from '.';
  import { BidStatus, ILocation, Role } from '../constants/interfaces';
  import { DBErrors } from 'objection-db-errors';
  import visibility from 'objection-visibility';
  
  class Bid extends mixins(Model) {
    // [x: string]: any;
  
    static tableName: string = 'bids';
    public readonly id: string;
    public amount: number;
    public advert_id: string;
    public status: BidStatus
    public user_id: string


  
    public created_at: Date | string;
  

    // static query(...args: any) {
    //     return super.query(...args).throwIfNotFound();
    //   }
    static relationMappings: RelationMappings | RelationMappingsThunk = {};
  }
  
  // export type UserT = ModelObject<User>
  export default Bid;
  