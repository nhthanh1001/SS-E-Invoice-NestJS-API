import { Injectable } from '@nestjs/common';
import { PORT } from '@common/constants/common.constant';
@Injectable()
export class AppService {
  getData(): { message: string; port: number } {
    console.log(PORT);
    return { message: 'Hello API', port: PORT };
  }
}
