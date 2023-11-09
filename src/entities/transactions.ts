import { Model, RelationMappings, RelationMappingsThunk } from "objection";
import mixins from ".";
import User from "./users";

export class Transaction extends mixins(Model) {
    static tableName: string = 'transactions'; 

    static hidden = ['user_id']

    static relationMappings: RelationMappings | RelationMappingsThunk = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
              from: 'transactions.user_id',
              to: 'users.id'
            }
          }
    }


}