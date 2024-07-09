import { Injectable } from '@nestjs/common';

@Injectable()
export class DdApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
