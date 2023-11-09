export enum Role {
  LANDLORD = 'LANDLORD',
  P_TENANT = 'P_TENANT',
}

export interface ILocation {
  name: string;
  coordinates: Coordinates;
}

export type Coordinates = [longitude: number, latitude: number];

export enum BidStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}
