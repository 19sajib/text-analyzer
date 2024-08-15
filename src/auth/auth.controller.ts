import { Controller, Post, Body, Request, UseGuards, Get, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // User Login
  @Post('login')
  async login(@Body() body: AuthDTO, @Request() req: any) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (user) {
      const token = await this.authService.login(user);
      if(req.session) req.session.token = token.access_token;

      return { success: true, message: 'Login successful', token };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  }

  // User Registration
  @Post('register')
  async register(@Body() body: AuthDTO, @Request() req: any) {
    const token = await this.authService.register(body.username, body.password);
    if(req.session) req.session.token = token.access_token;
    
    return { success: true, message: 'Registration successful', token };
  }

}

