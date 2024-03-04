import { Injectable, NotFoundException } from '@nestjs/common';

import { isNil } from 'lodash';

// import { CreatePostDto } from '../dtos/create-post.dto';
// import { UpdatePostDto } from '../dtos/update-post.dto';
import { IsNull, Not, SelectQueryBuilder } from 'typeorm';

import { PostOrderType } from '@/modules/database/constants';
import { paginate } from '@/modules/database/helpers';
import { PaginateOptions, QueryHook } from '@/modules/database/types';

import { PostEntity } from '../entities';
import { PostRepository } from '../repositories';

// import { PostEntity } from '../type';

@Injectable()
export class PostService {
  constructor(protected repository: PostRepository) {}

  /*
  获取分页数据
  @param options 分页选项
  @param callback 添加额外的查询
  */
  async paginate(options: PaginateOptions, callback?: QueryHook<PostEntity>) {
    const qb = await this.buildListQuery(this.repository.buildBaseQB(), options, callback);
    return paginate(qb, options);
  }

  protected posts: PostEntity[] = [
    { title: '第一篇文章标题', body: '第一篇文章内容' },
    { title: '第二篇文章标题', body: '第二篇文章内容' },
    { title: '第三篇文章标题', body: '第三篇文章内容' },
    { title: '第四篇文章标题', body: '第四篇文章内容' },
    { title: '第五篇文章标题', body: '第五篇文章内容' },
  ].map((v, id) => ({ ...v, id }));

  /*
  构建文章列表查询器
  @param qb 初始查询构造器
  @param options 排查分页选项后的查询选项
  @param callback 添加额外的查询
  */
  protected buildListQuery(
    qb: SelectQueryBuilder<PostEntity>,
    options: Record<string, any>,
    callback?: QueryHook<PostEntity>,
  ) {
    const { orderBy, isPublished } = options;
    let newQB = qb;
    if (typeof isPublished === 'boolean') {
      newQB = isPublished
        ? newQB.where({ publishedAt: Not(IsNull()) })
        : newQB.where({ publishedAt: IsNull() });
    }
    newQB = this.queryOrderBy(newQB, orderBy);
    if (callback) callback(newQB);
    return newQB;
  }

  /*
  构建 mysql 全文搜索的 sql
  @Param qb
  @Param search
   */
  protected async buildSearchQuery(qb: SelectQueryBuilder<PostEntity>, search: string) {
    qb.andWhere('title LIKE :search', { search: `%${search}%` })
      .orWhere('body LIKE :search', { search: `%${search}%` })
      .orWhere('summary LIKE :search', { search: `%${search}%` })
      .orWhere('category.name LIKE :search', { search: `%${search}%` })
      .orWhere('tags.name LIKE :search', { search: `%${search}%` })
      .orWhere('author.UserName LIKE :search', { search: `%${search}%` })
      .orWhere('author.nickname LIKE :search', { search: `%${search}%` });
    return qb;
  }

  /*
  对文章进行排序的Query构建
  @param qb
  @param orderBy 排序方式
  */
  protected queryOrderBy(qb: SelectQueryBuilder<PostEntity>, orderBy?: PostOrderType) {
    switch (orderBy) {
      case PostOrderType.CREATED:
        return qb.orderBy('post.createdAt', 'DESC');
      case PostOrderType.UPDATED:
        return qb.orderBy('post.updated', 'DESC');
      case PostOrderType.PUBLISHED:
        return qb.orderBy('post.publishedAt', 'DESC');
      case PostOrderType.CUSTOM:
        return qb.orderBy('post.customOrder', 'DESC');
      default:
        return qb
          .orderBy('post.createdAt', 'DESC')
          .addOrderBy('post.updated', 'DESC')
          .addOrderBy('post.publishedAt', 'DESC');
    }
  }

  async findAll() {
    return this.posts;
  }

  async findOne(id: number) {
    const post = this.posts.find((v) => v.id === id);
    if (isNil(post)) throw new NotFoundException(`the post with id  ${id} not exits!`);
    return post;
  }

  async create(data) {
    const newPost: PostEntity = {
      id: Math.max(...this.posts.map(({ id }) => id + 1)),
      ...data,
    };
    this.posts.push(newPost);
    return newPost;
  }

  async update(data) {
    let toUpdate = this.posts.find(({ id }) => id === data.id);
    if (isNil(toUpdate)) throw new NotFoundException(`the post with id  ${data.id} not exits!`);
    toUpdate = { ...toUpdate, ...data };
    this.posts = this.posts.map((v) => (v.id === data.id ? toUpdate : v));
    return toUpdate;
  }

  async delete(id: number) {
    const toDelete = this.posts.find((v) => v.id === id);
    if (isNil(toDelete)) throw new NotFoundException(`the post with id  ${id} not exits!`);
    this.posts = this.posts.filter((v) => v.id !== id);
    return toDelete;
  }
}
