import { Controller, Get, Post, Request, UseGuards, Logger, HttpStatus, HttpException, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseDTO } from 'src/dto/response.dto';

@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: any): Promise<any> {
    try {
      this.logger.log('Login Endpoint');
      return await this.authService.generateJwtToken(body);
    } catch (error) {
      // throw error;
       throw new HttpException(error.message, error.status ||
        HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewProfile')
  async getUser(@Request() req: any): Promise<any> {
    this.logger.log('View Profile Endpoint');
     return req.user;
  }
}