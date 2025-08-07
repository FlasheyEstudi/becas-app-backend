import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api-beca') // Agrega el prefijo /api-beca
export class AppController {
  constructor(private readonly appService: AppService) {}

    };
  
