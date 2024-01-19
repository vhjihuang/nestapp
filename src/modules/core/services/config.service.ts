import { Injectable } from '@nestjs/common';
import { get } from 'lodash';

const config: Record<string, any> = {
  name: 'app',
};
@Injectable()
export class ConfigService {
  get<T>(key: string, defaultValue?: T): T | undefined {
    return get(config, key, defaultValue);
  }
}