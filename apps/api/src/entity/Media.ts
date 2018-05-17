import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ColumnOptions,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Task } from './Task';
import { Step } from './Step';
import { Org } from './Org';

const nullable: ColumnOptions = { nullable: true };

@Entity("media")
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column(nullable)
  description: string;
  
  @Column(nullable)
  url: string;

  @Column(nullable)
  type: string;

  @Column({ nullable: true, type: 'jsonb' })
  responses: object;

  @ManyToOne(type => Task, task => task.media)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(type => Step, step => step.media)
  @JoinColumn({ name: 'step_id' })
  step: Step;

  @ManyToOne(type => Org, org => org.media)
  @JoinColumn({ name: 'published_by' })
  publishedBy: Org;
}
