import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  create(@Body() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.findOne(passengerId);
    if (!passenger) throw new NotFoundException('passenger not found');
    return this.flightService.addPassenger(flightId, passengerId);
  }

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const flight = await this.flightService.findOne(id);
    if (!flight) throw new NotFoundException('flight not found');
    return flight;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
    return this.flightService.update(id, flightDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.flightService.delete(id);
  }
}
