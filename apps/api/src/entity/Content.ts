import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column, 
  JoinTable,
  OneToMany,
  ManyToOne,
  OneToOne
} from "typeorm";
import { Org } from './Org';
import { Admin } from './Admin';
import { File } from './File';
import { TaskTemplate } from './TaskTemplate';

@Entity('content')
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Org, org => org.admins)
  org: Org;

  @ManyToOne(type => Org, admin => admin.contents )
  admin: Admin;

  @ManyToOne(type => Org, taskTemplate => taskTemplate.contents )
  taskTemplate: TaskTemplate;

  @OneToOne(type => File, file => file.content )
  file: File;
}
