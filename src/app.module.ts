import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSource } from './data_source';
import { BasicUser } from './users/users.entity';
import { ProfileController } from './profile/profile.controller';
import { UserProfile } from './profile/profile.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './../mydb2.db',
    entities: [BasicUser,UserProfile],
    synchronize: true,
  })],
  controllers: [AppController, UsersController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
