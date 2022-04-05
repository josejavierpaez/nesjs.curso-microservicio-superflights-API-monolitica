import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PASSENGER } from 'src/common/models/intex.models';
import { PassengerDTO } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
    const newPassenger = new this.model(passengerDTO);
    return await newPassenger.save();
  }

  async findAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async findOne(id: string) {
    return await this.model.findById(id);
  }

  async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, passengerDTO);
  }
  async delete(id: string) {
    return await this.model.findByIdAndDelete(new Types.ObjectId(id));
  }
}
