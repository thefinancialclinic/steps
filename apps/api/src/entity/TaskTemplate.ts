import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Org } from './Org';
import { Admin } from './Admin';

@Entity('task_template')
export class TaskTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Org, org => org.taskTemplates)
  @JoinColumn({ name: 'org_id' })
  org: Org;

  @ManyToOne(type => Admin, admin => admin.taskTemplates)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;
}
