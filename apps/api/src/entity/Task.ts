import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Client } from "./Client";
import { Org } from "./Org";

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "jsonb", nullable: true })
  steps: any;

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
}
