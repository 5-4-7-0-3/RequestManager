
import { Controller, Post, Body } from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('api')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  async handleRequest(@Body('index') index: number) {
    return this.requestService.processRequest(index);
  }
}
