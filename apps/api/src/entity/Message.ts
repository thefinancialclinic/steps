import {
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Column, 
  JoinTable,
  OneToMany,
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
  org: Org;

  @ManyToOne(type => Coach, coach => coach.messages)
  coach: Coach;

  @ManyToOne(type => Client, client => client.messages)
  client: Client;
}
