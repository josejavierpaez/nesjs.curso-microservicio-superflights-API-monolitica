import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UserDTO } from 'src/user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authtentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req: Request) {
    return await this.authService.signIn(req.user);
  }

  @Post('signup')
  async signUp(@Body() userDto: UserDTO) {
    return await this.authService.signUp(userDto);
  }
}
