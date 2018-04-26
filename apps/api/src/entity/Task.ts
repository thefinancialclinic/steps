import {
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany
} from "typeorm";
import { Client } from "./Client";

@Entity()
export class Task {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "jsonb", nullable: true })
  steps: any;

  @Column({ type: "text", nullable: true })
  content: string;

  @ManyToMany(type => Client)
  @JoinTable({
      name: 'client_task',
      joinColumns: [ { name: 'task_id' }],
      inverseJoinColumns: [ { name: 'client_id' }]
  })
  clients: Client[];
}
