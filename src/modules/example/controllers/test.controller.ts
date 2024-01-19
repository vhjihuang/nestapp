import { Controller, Get, Inject } from '@nestjs/common';
import { FirstService } from '../services/first.service';
import { FourthService } from '../services/fourth.service';
import { SecondService } from '../services/second.service';
import { FifthService } from '../services/fifth.service';
import { SeventhService } from '../services/seventh.service';
import { EighthService } from '../services/eighth.service';
import { PostService } from '@/modules/content/services/post.service';
import { ConfigService } from '@/modules/core/services/config.service';

@Controller('test')
export class TestController {
  constructor(
    private first: FirstService,
    private fifth: FifthService,
    private seventh: SeventhService,
    private eighth: EighthService,
    @Inject('ID-EXAMPLE') private idExp: FirstService,
    @Inject('FACTORY-EXAMPLE') private ftExp: FourthService,
    @Inject('ALIAS-EXAMPLE') private asExp: FirstService,
    @Inject('ASYNC-EXAMPLE') private acExp: SecondService,
    private postService: PostService,
    private configService: ConfigService,
  ) {}

  @Get('name')
  async name() {
    return this.configService.get('name');
  }

  @Get('posts')
  async posts() {
    return this.postService.findAll();
  }

  @Get('scope')
  async echoScope() {
    await this.eighth.echo();
    await this.seventh.add();
    console.log(`in controller ${await this.seventh.find()}`);
    return 'Test Scope';
  }

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
