import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Put,
  HttpCode,
  HttpStatus,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@ApiTags('pasengers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  @ApiOperation({ summary: 'create passenger' })
  create(@Body() passengerDTO: PassengerDTO) {
    return this.passengerService.create(passengerDTO);
  }

  @Get()
  @ApiOperation({ summary: 'get passenger' })
  findAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get passenger by id' })
  async findOne(@Param('id') id: string) {
    const passenger = await this.passengerService.findOne(id);
    if (!passenger) throw new NotFoundException('passenger not found');
    return passenger;
  }

  @Put(':id')
  @ApiOperation({ summary: 'update passenger' })
  update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
    return this.passengerService.update(id, passengerDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete passenger' })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.passengerService.delete(id);
  }
}
