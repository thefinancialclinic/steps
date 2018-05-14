import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
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
  @JoinColumn({ name: 'org_id' })
  org: Org;
}
