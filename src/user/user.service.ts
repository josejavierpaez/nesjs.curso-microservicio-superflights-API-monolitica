import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/common/interfaces/user.interface';
import { USER } from 'src/common/models/intex.models';
import { UserDTO } from './dto/user.dto';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hashSync(password, salt);
  }
  async create(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });

    return await newUser.save();
  }
  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id);
  }

  async update(id: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const user = { ...userDTO, password: hash };

    return await this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(new Types.ObjectId(id));
  }
}
