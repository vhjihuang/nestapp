import { Transform } from 'class-transformer';

import { IsBoolean, IsOptional, MaxLength } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';
import { toBoolean } from '@/modules/core/helpers';
import { PaginateWidthTrashedDto } from '@/modules/restful/dtos';

/* 文章分页查询验证 */
@DtoValidation({ type: 'query' })
export class QueryPostDto extends PaginateWidthTrashedDto {
  /* 全文搜索 */
  @MaxLength(100, { always: true, message: '搜索字符串长度不得超过$constraint1' })
  @IsOptional({ always: true })
  search?: string;

  /* 是否查询已发布(全部文章: 不填、只查询已发布的: true、只查询未发布: false) */
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
