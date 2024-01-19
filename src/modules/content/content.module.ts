import { Module } from '@nestjs/common';

import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService], // 导出服务
})
export class ContentModule {}
