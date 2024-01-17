import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

@Injectable()
export class CreatePostDto {
  @MaxLength(255, {
    always: true,
    message: '帖子标题最大长度为$constraint1', // 自定义错误消息
  })
  @IsNotEmpty({ groups: ['create'], message: '帖子标题必填' })
  @IsOptional({ groups: ['update'] })
  title: string;

  @IsNotEmpty({ groups: ['create'], message: '帖子内容必填' })
  @IsOptional({ groups: ['update'] })
  body: string;

  @MaxLength(500, {
    always: true,
    message: '摘要最大长度为$constraint1', // 自定义错误消息
  })
  @IsOptional({ always: true })
  summary?: string;
}
