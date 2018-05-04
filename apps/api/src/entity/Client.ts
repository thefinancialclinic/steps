import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column, 
  JoinTable,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Task } from './Task';
import { Message } from './Message';
import { Org } from './Org';


@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Task, task => task.client)
  tasks: Task[];

  @OneToMany(type => Message, message => message.client)
  messages: Message[];

  @ManyToOne(type => Org, org => org.clients)
  org: Org;
}
