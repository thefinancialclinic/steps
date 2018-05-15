import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Org } from './Org';
import { TaskTemplate } from './TaskTemplate';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Org, org => org.admins)
  @JoinColumn({ name: 'org_id' })
  org: Org;

  @OneToMany(type => TaskTemplate, taskTemplate => taskTemplate.admin)
  taskTemplates: TaskTemplate[];
}
