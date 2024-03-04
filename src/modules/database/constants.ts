export const CUSTOM_REPOSITORY_METADATA = 'CUSTOM_REPOSITORY_METADATA';

/*
文章内容类型
*/
export enum PostBodyType {
  HTML = 'html',
  MD = 'markdown',
}

/*
文章排序类型
*/
export enum PostOrderType {
  CREATED = 'createdAt',
  UPDATED = 'updatedAt',
  PUBLISHED = 'publishedAt',
  CUSTOM = 'custom',
}

/*
排序方式
 */
export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

/*
软删除数据查询类型
 */
export enum SelectTrashMode {
  /* 全部数据 */
  ALL = 'all',

  /* 只查询回收站中的 */
  ONLY = 'only',

  /* 只查询没有被软删除的 */
  NONE = 'none',
}
