import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { log } from 'node:console';
import { dot } from 'node:test/reporters';
import { appDataSource } from 'src/data_source';

import { Fb_Post } from 'src/fb_post.entity';

import { AppUser } from 'src/user.entity';
import { Like, PrimaryGeneratedColumn } from 'typeorm';

export class DTO_LoginUser {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class DTO_user {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}

export class DTO_Post {
  @ApiProperty()
  @IsNotEmpty()
  blog: string;

  @ApiProperty()
  like: number;

  @ApiProperty()
  comment: string;
}

@Controller('users')
export class UsersController {
  @Post('create_account')
  // @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() dto: DTO_LoginUser) {
    const new_user = await AppUser.create({
      email: dto.email,
      password: dto.password,
    }).save();
    return new_user;
  }

  @Post('create_post/:id')
  // @UsePipes(new ValidationPipe({ transform: true }))
  async post_a_post(@Param('id') id: number, @Body() dto: DTO_Post) {
    const create_post = await Fb_Post.create({
      user: { id: id },
      blog: dto.blog,
    }).save();

    return create_post;
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async logging_in(@Body() dto: DTO_LoginUser) {
    const user = await AppUser.findOne({
      where: {
        email: dto.email,
        password: dto.password,
      },
    });

    if (user == null || user == undefined) {
      return 'Email or Id is wrong';
    }
    return user;
  }

  @Get('all_feeds')
  async get_all_feeds() {
    const user =await Fb_Post.find({
      relations: ['user'],
    });

    return user;
  }

  @Get('user_feeds/:user_id')
  async getFeedsByUserId(@Param('user_id') user_id: number) {
    var res = await Fb_Post.find({
      where: { user: { id: user_id } },
      relations: ['user'],
    });

    return res;

    // var resp=await appDataSource.query(`SELECT * FROM fb_post where userId==${user_id}`)
  }
  @Get('feed_user/:feed_id')
  async getUserByFeedId(@Param('feed_id') feedId: number) {
    var res = await AppUser.findOne({
      where: { blog: { id: feedId } },
      relations: ['blog'],
    });

    return res;

    // var resp=await appDataSource.query(`SELECT * FROM fb_post where userId==${user_id}`)
  }

  // @Post('like/:id')
  // async like_button(@Param('id') id:number ,@Body()dto:Fb_Post){
  //   const create_like= await Fb_Post.create({

  //     like:dto.like
  //   })
  //   return create_like
  // }

  @Post('likes/:id')
  // @UsePipes(new ValidationPipe({ transform: true }))
  async likeNewButton(@Param('id') id: number, @Body() body) {
  //   var res= await Fb_Post.findOne({where:{id: body.post_id},relations:['like']})
  //  const user:AppUser= new AppUser()
  //   user.id=id
  //   var d=res.like
  //   d.push(user)

    console.log(body)

    const create_like = await AppUser.update(id, {
      like_blog:{id:body.post_id}
    });

    await Fb_Post.update(body.post_id, {
      counter:()=>"counter+1",
    });

    return create_like;
  }

  @Post('comments/:id')
  async commentNewButton(@Param('id') id:number, @Body() body){
    console.log(body);

    const create_comment= await AppUser.update(id,{
      comment_post:{id:body.post_id}
    });
    
    return create_comment;
    
  }
}
