import { UserProfile } from 'src/profile/profile.entity';
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
 
  
  @Entity()
  export class BasicUser extends BaseEntity {
  
      @PrimaryGeneratedColumn('increment')
      id: number;
  
      @Column({length: 20})
      username: string
  
      @OneToOne(()=> UserProfile, profile=>profile.user, {cascade:true, eager:true})
      @JoinColumn()
      profile: UserProfile;
  
  }
  