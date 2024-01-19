import { DynamicModule, Module } from '@nestjs/common';
import { DynamicService } from './services/dynamic.service';

@Module({})
export class DynamicsModule {
  static forRoot(options: { config: RecordAny }): DynamicModule {
    return {
      module: DynamicsModule,
      global: true, // 设置为全局模块
      providers: [
        {
          provide: DynamicService,
          useFactory: () => {
            return new DynamicService(options.config);
          },
        },
      ],
      exports: [DynamicService],
    };
  }
}
