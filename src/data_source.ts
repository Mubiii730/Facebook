import { DataSource } from "typeorm";
import { BasicUser } from "./users/users.entity";

export const appDataSource = new DataSource({
    type: 'sqlite',
    database: './../mydb2.db',
    entities: [BasicUser,],
    synchronize: true,
  
  });
  