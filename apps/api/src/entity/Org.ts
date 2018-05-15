import {
  Entity,
  PrimaryGeneratedColumn,
  Column, 
  OneToMany
} from "typeorm";
import { Admin } from './Admin';
import { Client } from './Client';
import { Coach } from './Coach';
import { Content } from './Content';
import { File } from './File';
import { Task } from './Task';
import { TaskTemplate } from './TaskTemplate';

@Entity('org')
export class Org {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  botPhone: string;

  @Column()
  name: string;

  @OneToMany(type => Admin, admin => admin.org, { onDelete: 'CASCADE' })
  admins: Admin[];

  @OneToMany(type => Client, client => client.org, { onDelete: 'CASCADE' })
  clients: Client[];

  @OneToMany(type => Coach, coach => coach.org, { onDelete: 'CASCADE' })
  coaches: Coach[];

  @OneToMany(type => Content, content => content.org, { onDelete: 'CASCADE' })
  contents: Content[];
  
  @OneToMany(type => File, file => file.org, { onDelete: 'CASCADE' })
  files: File[];

  @OneToMany(type => Task, task => task.org, { onDelete: 'CASCADE' })
  tasks: Task[];

  @OneToMany(type => TaskTemplate, taskTemplate => taskTemplate.org, { onDelete: 'CASCADE' })
  taskTemplates: TaskTemplate[];
}
