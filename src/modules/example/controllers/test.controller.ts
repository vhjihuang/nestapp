import { Controller, Get, Inject } from '@nestjs/common';
import { FirstService } from '../services/first.service';
import { FourthService } from '../services/fourth.service';
import { SecondService } from '../services/second.service';
import { FifthService } from '../services/fifth.service';

@Controller('test')
export class TestController {
  constructor(
    private first: FirstService,
    private fifth: FifthService,
    @Inject('ID-EXAMPLE') private idExp: FirstService,
    @Inject('FACTORY-EXAMPLE') private ftExp: FourthService,
    @Inject('ALIAS-EXAMPLE') private asExp: FirstService,
    @Inject('ASYNC-EXAMPLE') private acExp: SecondService,
  ) {}

  @Get('circular')
  async useCircular() {
    return this.fifth.circular();
  }

  @Get('value')
  async useValue() {
    return this.first.useValue();
  }

  @Get('id')
  async useId() {
    return this.idExp.useId();
  }

  @Get('factory')
  async useFactory() {
    return this.ftExp.getContent();
  }

  @Get('alias')
  async useAlias() {
    return this.asExp.useAlias();
  }

  @Get('async')
  async useAsync() {
    return this.acExp.useAsync();
  }
}
