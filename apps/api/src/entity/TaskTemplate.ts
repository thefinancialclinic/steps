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
import { Admin } from './Admin';

@Entity('task_template')
export class TaskTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Org, org => org.taskTemplates)
  org: Org;

  @ManyToOne(type => Admin, admin => admin.taskTemplates)
  admin: Admin;
}
