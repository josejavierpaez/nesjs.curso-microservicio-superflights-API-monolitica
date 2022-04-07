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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@ApiTags('flight')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'create flight' })
  create(@Body() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO);
  }

  @Post(':flightId/passenger/:passengerId')
  @ApiOperation({ summary: 'add passengerId to flight' })
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.findOne(passengerId);
    if (!passenger) throw new NotFoundException('passenger not found');
    return this.flightService.addPassenger(flightId, passengerId);
  }

  @Get()
  @ApiOperation({ summary: 'get flight' })
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get flight by id' })
  async findOne(@Param('id') id: string) {
    const flight = await this.flightService.findOne(id);
    if (!flight) throw new NotFoundException('flight not found');
    return flight;
  }

  @Put(':id')
  @ApiOperation({ summary: 'update flight' })
  update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
    return this.flightService.update(id, flightDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete flight' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.flightService.delete(id);
  }
}
