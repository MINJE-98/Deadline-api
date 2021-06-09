import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'Baas**&112',
      database: 'test',
      entities: [join(__dirname, '/**/*.entity.js')],
      synchronize: true, // false가 안전함
    }),
    UsersModule,
    TeamsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
