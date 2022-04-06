import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/intex.models';
import { Model, Types } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightDTO } from './dto/flight.dto';
@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async create(flightDTO: FlightDTO): Promise<IFlight> {
    const newFlight = new this.model(flightDTO);

    return await newFlight.save();
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.model.findById(id).populate('passengers');
  }

  async update(id: string, flightDTO: FlightDTO) {
    return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
  }

  async delete(id: string): Promise<IFlight> {
    return await this.model.findByIdAndDelete(new Types.ObjectId(id));
  }
  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    console.log({ flightId }, { passengerId });
    try {
      return await this.model
        .findByIdAndUpdate(
          flightId,
          {
            $addToSet: { passengers: passengerId },
          },
          { new: true },
        )
        .populate('passengers');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
