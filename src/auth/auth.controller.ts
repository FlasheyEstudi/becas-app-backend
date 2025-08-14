	import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
	import { AuthService } from './auth.service';
	import { LocalAuthGuard } from './local-auth.guard';
	import { JwtAuthGuard } from './jwt-auth.guard';
	@Controller('auth')
	export class AuthController {
	  constructor(private readonly authService: AuthService) {}
	  @Post('login')
	  @UseGuards(LocalAuthGuard)
	  async login(@Request() req) {
	    return this.authService.login({
	      identifier: req.body.identifier,
	      password: req.body.password
	    });
	  }
	  @Post('register')
	  async register(@Body() userData: {
	    username: string;
	    nombre: string;
	    apellidos: string | null;
	    email: string;
	    password: string;
	    role?: string;
	  }) {
	    return this.authService.register(userData);
	  }
	  @Post('profile')
	  @UseGuards(JwtAuthGuard)
	  getProfile(@Request() req) {
	    return req.user;
	  }
	}