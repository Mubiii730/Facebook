import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BasicUser } from './users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from 'src/profile/profile.entity';

export class DTOUserAdd {
  @ApiProperty()
  bio: string;

  @ApiProperty()
  username: string;
}

@Controller('users')
export class UsersController {
  @Post('create_user')
  async createUser(@Body() body: DTOUserAdd): Promise<BasicUser> {
    var user = await BasicUser.create({
      username: body.username,
    }).save();

    var profile = await UserProfile.create({
      bio: body.bio,
      user: {
        id: user.id,
      },
    }).save();

    return await BasicUser.findOne({
      where: {
        id: user.id,
      },
    });
  }

  @Get('get_user_by_id/:id')
  async getUser(@Param('id') id: number): Promise<BasicUser> {
    return BasicUser.findOne({
      where: {
        id: id,
      },
    });
  }
}
