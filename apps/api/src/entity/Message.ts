import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { Org } from './Org';
import { Coach } from './Coach';
import { Client } from './Client';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Org, org => org.admins)
  @JoinColumn({ name: 'org_id' })
  org: Org;

  @ManyToOne(type => Coach, coach => coach.messages)
  @JoinColumn({ name: 'coach_id' })
  coach: Coach;

  @ManyToOne(type => Client, client => client.messages)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}
