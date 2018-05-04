import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column, 
  JoinTable,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Org } from './Org';
import { Message } from './Message';

@Entity('coach')
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Message, message => message.coach)
  messages: Message[];

  @ManyToOne(type => Org, org => org.coaches)
  org: Org;
}
