import {
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
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

  @Column({ type: "date", nullable: false })
  dateCreated: Date;

  @Column({ type: "date", nullable: true })
  dateCompleted: Date;

  @ManyToOne(type => Client, client => client.tasks)
  client: Client;

  @ManyToOne(type => Org, org => org.tasks)
  org: Org;
}
