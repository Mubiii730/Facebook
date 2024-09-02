import { DataSource } from 'typeorm';

import { AppUser } from './user.entity';
import { Fb_Post } from './fb_post.entity';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: './../fb4.db',
  entities: [AppUser, Fb_Post],
  synchronize: true,
  extra: {
    busyTimeout: 10000, // wait up to 10 seconds
  },
}); 
