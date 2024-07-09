import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
dotenv.config();


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(){
    return {
      api_name: "dd_test",
      version: process.env.VERSION
    }
  }
}
