import { isNil } from 'lodash';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { OrderQueryType, PaginateOptions, PaginateReturn } from './types';

/*
分页函数
@param qb queryBuilder实例
@param options 分页选项
*/
export const paginate = async <E extends ObjectLiteral>(
  qb: SelectQueryBuilder<E>,
  options: PaginateOptions,
): Promise<PaginateReturn<E>> => {
  const limit = isNil(options.limit) || options.limit < 1 ? 1 : options.limit;
  const page = isNil(options.page) || options.page < 1 ? 1 : options.page;
  const start = page >= 1 ? page - 1 : 0;
  const totalItems = await qb.getCount();
  qb.take(limit).skip(start * limit);
  const items = await qb.getMany();
  const totalPages =
    totalItems % limit === 0 ? Math.floor(totalItems / limit) : Math.floor(totalItems / limit) + 1;
  const remained = totalItems % limit !== 0 ? totalItems % limit : limit;
  const itemCount = page < totalPages ? limit : remained;
  return {
    items,
    meta: {
      totalItems,
      itemCount,
      perPage: limit,
      totalPages,
      currentPage: page,
    },
  };
};

/*
为查询添加排序,默认排序规则为 DESC
@Param SelectQueryBuilder qb 原查询
@Param string alias 别名
@Param OrderQueryType, orderBy 查询排序
 */
export const getOrderByQuery = <E extends ObjectLiteral>(
  qb: SelectQueryBuilder<E>,
  alias: string,
  orderBy?: OrderQueryType,
) => {
  if (isNil(orderBy)) return qb;
  if (typeof orderBy === 'string') return qb.orderBy(`${alias}.${orderBy}`, 'DESC');
  if (Array.isArray(orderBy)) {
    for (const item of orderBy) {
      // 此句判断不够严谨, 不为 string 还是有好几种基础类型,现在直接默认为对象了
      typeof item === 'string'
        ? qb.addOrderBy(`${alias}.${orderBy}`, 'DESC')
        : qb.addOrderBy(`${alias}.${item.name}`, item.order);
    }
    return qb;
  }
  // 此句代码也不够严谨
  return qb.orderBy(`${alias}.${(orderBy as any).name}`, (orderBy as any).order);
};
