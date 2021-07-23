import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as e from './entities';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { ItemsModule } from './items/items.module';
import { TagsModule } from './tags/tags.module';
import { DaedlineModule } from './daedlines/daedline.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { ImageModule } from './image/image.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env' : '.env.dev',
      // ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST, //'172.17.0.1'
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [e.Deadlines, e.Users, e.Teams, e.TeamMembers, e.Tags, e.Items],
      logging: true,
      synchronize: false, // false가 안전함
    }),
    UsersModule,
    TeamsModule,
    ItemsModule,
    TagsModule,
    DaedlineModule,
    TeamMembersModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
