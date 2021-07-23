import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items, TeamMembers, Teams, Users } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Teams, TeamMembers, Users, Items])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
