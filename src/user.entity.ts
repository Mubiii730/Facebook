import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { Fb_Post } from "./fb_post.entity"
import { IsEmail, IsOptional, IsStrongPassword } from "class-validator"

@Entity()
export class AppUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    
    email: string

    @Column()
   
    password: string


   
    @OneToMany(()=>Fb_Post, blog=>blog.user)
    blog:Fb_Post;

    @ManyToOne(()=>Fb_Post,b=>b.like)
    like_blog:Fb_Post

    @ManyToOne(()=>Fb_Post, comment_post=>comment_post.comment_user)
    comment_post:Fb_Post

    // @OneToMany(()=>PostLike, like=>like.user)
    // like:PostLike

    // @OneToMany(() => Fb_Post , (post) => post.user)
    // post: Fb_Post[]

   
}