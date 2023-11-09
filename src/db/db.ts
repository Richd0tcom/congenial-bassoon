// import { Knex } from "knex";
import config from "./knexfile";
import  Knex from 'knex';
import { Model } from 'objection';



// instance
export const KnexInstance = Knex(config[process.env.NODE_ENV!])
Model.knex(KnexInstance);

