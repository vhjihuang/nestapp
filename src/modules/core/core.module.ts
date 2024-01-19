import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
@Global()
@Module({
  exports: [ConfigService], // 导出 ConfigService
  providers: [ConfigService],
})
export class CoreModule {}
