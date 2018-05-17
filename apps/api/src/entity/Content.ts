import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn
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
  @JoinColumn({ name: 'org_id' })
  org: Org;

  @ManyToOne(type => Org, admin => admin.contents )
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @ManyToOne(type => Org, taskTemplate => taskTemplate.contents )
  @JoinColumn({ name: 'task_template_id' })
  taskTemplate: TaskTemplate;

  @OneToOne(type => File, file => file.content )
  @JoinColumn({ name: 'file_id' })
  file: File;
}
