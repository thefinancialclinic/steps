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
import { TaskTemplate } from './TaskTemplate';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Org, org => org.admins)
  org: Org;

  @OneToMany(type => TaskTemplate, taskTemplate => taskTemplate.admin)
  taskTemplates: TaskTemplate[];
}
