import { Controller, Get } from '@nestjs/common';
import { DdApiService } from './dd-api.service';
import * as dotenv from 'dotenv';
dotenv.config();


@Controller()
export class DdApiController {
  constructor(private readonly ddApiService: DdApiService) { }

  @Get()
  getHello() {
    return {
      api_name: "dd_test",
      version: process.env.VERSION
    }

  }







}
