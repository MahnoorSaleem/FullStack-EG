import { Controller, Get, Post, Request, UseGuards, Logger, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req): Promise<any> {
    try {
      this.logger.log('Login Endpoint');
      return await this.authService.generateJwtToken(req.body);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewProfile')
  async getUser(@Body() req): Promise<any> {
    console.log('profile', req.body)
    this.logger.log('View Profile Endpoint');
    // return req.user;
     return req.body.user;
  }
}