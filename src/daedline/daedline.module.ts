import { Module } from '@nestjs/common';
import { DaedlineService } from './daedline.service';
import { DaedlineController } from './daedline.controller';

@Module({
  controllers: [DaedlineController],
  providers: [DaedlineService]
})
export class DaedlineModule {}
