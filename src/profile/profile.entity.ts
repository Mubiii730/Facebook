import { ApiBadRequestResponse } from "@nestjs/swagger";
import { BasicUser } from "src/users/users.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class UserProfile extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bio: string 

    @OneToOne(()=> BasicUser, user=>user.profile)
    user: BasicUser;
}
