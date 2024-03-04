import { BaseRepository } from '@/modules/database/base';

import { CustomRepository } from '@/modules/database/decorators';

import { CommentEntity } from '../entities/comment.entity';
import { PostEntity } from '../entities/post.entity';

@CustomRepository(PostEntity)
export class PostRepository extends BaseRepository<PostEntity> {
  protected _qbName = 'post';

  buildBaseQB() {
    return this.createQueryBuilder(this._qbName)
      .leftJoinAndSelect(`${this._qbName}.author`, 'author')
      .leftJoinAndSelect(`${this._qbName}.category`, 'category')
      .leftJoinAndSelect(`${this._qbName}.tags`, 'tags')
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(c.id)', 'count')
          .from(CommentEntity, 'c')
          .where(`c.pots.id = ${this._qbName}.id`);
      }, 'commentCount')
      .loadRelationCountAndMap(`${this._qbName}.commentCount`, `${this._qbName}.comments`);
  }
}
