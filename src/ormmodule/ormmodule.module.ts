import { Global, Module } from '@nestjs/common';
import { appDataSource } from 'src/data_source';
import { DataSource } from 'typeorm';

@Global()
@Module({
    imports : [],
    providers : [
        {
            provide : DataSource,
            useFactory : async ()=> {
                await appDataSource.initialize()
                return appDataSource;
            }
        }
    ]
})
export class OrmmoduleModule {}
