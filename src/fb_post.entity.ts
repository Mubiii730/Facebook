import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
  Like,
} from 'typeorm';
import { AppUser } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

// import { Post_Comment } from "./comments.entity"

@Entity()
export class Fb_Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  blog: string;
 


  @ManyToOne(() => AppUser, (user) => user.blog)
  user: AppUser;

  @OneToMany(() => AppUser, (x) => x.like_blog)
  like: AppUser[];
  
  @Column({default:0})
  counter:number;

  @OneToMany(()=>AppUser, Comment_user=> Comment_user.comment_post )
  comment_user:AppUser
 

  // @OneToMany( ()=>Post_Comment, cmnt=>cmnt.post)
  // cmnt:Post_Comment
}
