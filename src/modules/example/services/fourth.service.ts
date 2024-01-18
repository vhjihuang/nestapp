import { Injectable } from '@nestjs/common';
import { ThirdService } from './third.service';

@Injectable()
export class FourthService {
  constructor(private third: ThirdService) {}

  getContent() {
    return this.third.useFactory();
  }

  async getContentAsync() {
    return new Promise((res) => {
      setTimeout(() => {
        res(this.third);
      }, 100);
    });
  }
}
