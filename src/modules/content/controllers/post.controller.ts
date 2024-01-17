import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { isNil } from 'lodash';

import { PostEntity } from '../type';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';

let posts: PostEntity[] = [
  {
    title: '第一篇文章标题',
    body: '第一篇文章内容',
  },
  {
    title: '第二篇文章标题',
    body: '第二篇文章内容',
  },
  {
    title: '第三篇文章标题',
    body: '第三篇文章内容',
  },
  {
    title: '第四篇文章标题',
    body: '第四篇文章内容',
  },
  {
    title: '第五篇文章标题',
    body: '第五篇文章内容',
  },
].map((v, id) => ({
  ...v,
  id,
}));

@Controller('posts')
export class PostController {
  @Get()
  async index() {
    return posts;
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    const post = posts.find((v) => v.id === +id);
    if (isNil(post)) throw new NotFoundException(`the post with id ${id} not exits!`);
    return post;
  }

  @Post()
  async store(
    @Body(
      new ValidationPipe({
        transform: true, // 自动转换DTO
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ['create'],
      }),
    )
    data: CreatePostDto,
  ) {
    const newPost: PostEntity = {
      id: Math.max(...posts.map((v) => v.id + 1)),
      ...data,
    };
    posts.push(newPost);
    return newPost;
  }

  @Patch()
  async update(
    @Body(
      new ValidationPipe({
        transform: true, // 自动转换DTO
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ['update'],
      }),
    )
    data: UpdatePostDto,
  ) {
    let toUpdate = posts.find((v) => v.id === +data.id);
    if (isNil(toUpdate)) throw new NotFoundException(`the post with id ${data.id} not exits!`);
    toUpdate = { ...toUpdate, ...data };
    posts = posts.map((v) => (v.id === +data.id ? toUpdate : v));
    return toUpdate;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const toDelete = posts.find((v) => v.id === +id);
    if (isNil(toDelete)) throw new NotFoundException(`the post with id ${id} not exits!`);
    posts = posts.filter((v) => v.id !== +id);
    return toDelete;
  }
}
