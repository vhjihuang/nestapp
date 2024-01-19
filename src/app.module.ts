import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './modules/content/content.module';
import { ExampleModule } from './modules/example/example.module';
import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [ContentModule, ExampleModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
