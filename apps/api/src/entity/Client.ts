import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column, 
  JoinTable
} from "typeorm";
import { Task } from './Task';
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(type => Task, task => task.clients)
  @JoinTable({
    name: 'client_task',
    joinColumns: [ { name: 'client_id' }],
    inverseJoinColumns: [ { name: 'task_id' }]
  })
  tasks: Task[];
}
