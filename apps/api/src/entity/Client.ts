import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column, 
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Task } from './Task';
import { Message } from './Message';
import { Org } from './Org';
import { Coach } from "./Coach";


@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @ManyToOne(type => Coach, coach => coach.clients)
  @JoinColumn({ name: 'coach_id' })
  coach: Coach;

  @OneToMany(type => Task, task => task.client)
  tasks: Task[];

  @OneToMany(type => Message, message => message.client)
  messages: Message[];

  @ManyToOne(type => Org, org => org.clients)
  @JoinColumn({ name: 'org_id' })
  org: Org;
}
