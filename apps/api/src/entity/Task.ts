import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { Client } from "./Client";
import { Org } from "./Org";
import { Step } from "./Step"

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ name: 'date_created', type: "date", nullable: false })
  dateCreated: Date;

  @Column({ name: 'date_completed', type: "date", nullable: true })
  dateCompleted: Date;

  @ManyToOne(type => Client, client => client.tasks)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(type => Org, org => org.tasks)
  @JoinColumn({ name: 'org_id' })
  org: Org;

  @OneToMany(type => Step, step => step.task)
  steps: Step[];
}
