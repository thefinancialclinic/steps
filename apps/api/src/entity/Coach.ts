import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Org } from './Org';
import { Message } from './Message';
import { Client } from './Client'

@Entity('coach')
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Message, message => message.coach)
  messages: Message[];

  @OneToMany(type => Client, client => client.coach)
  clients: Client[]

  @ManyToOne(type => Org, org => org.coaches)
  @JoinColumn({ name: 'org_id' })
  org: Org;
}
