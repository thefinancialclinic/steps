import { PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { Task } from "./Task";
import { Media } from './Media';
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

@Entity('step')
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'text' })
  text: string;

  @Column({ name: 'note' })
  note: string;

  @ManyToOne(type => Task, task => task.steps)
  @JoinColumn({ name: "task_id" })
  task: Task;

  @OneToMany(type => Media, media => media.step)
  media: Media[];
}
