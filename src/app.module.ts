import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { OrmmoduleModule } from './ormmodule/ormmodule.module';
import { UsersController } from './users/users.controller';


@Module({
  imports: [OrmmoduleModule],
  controllers: [AppController, UsersController,],
  providers: [AppService],
})
export class AppModule {}
