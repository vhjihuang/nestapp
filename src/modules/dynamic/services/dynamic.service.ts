import { Injectable } from '@nestjs/common';
import { get } from 'lodash';

@Injectable()
export class DynamicService {
  protected _config: RecordAny = {};

  constructor(data: RecordAny) {
    this._config = data; // 初始化配置数据
  }

  getter<T>(key: string, defaultValue?: T): T | undefined {
    return get(this._config, key, defaultValue);
  }
}
