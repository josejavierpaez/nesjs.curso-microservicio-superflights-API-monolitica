import { IPassenger } from './passenger.interface';

export interface IFlight extends Document {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate;
  passenger: IPassenger[];
}
