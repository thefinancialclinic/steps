import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { Message } from "./Message";

// also enforced by CHECK constraint
export type RequestStatus = "NEEDS_ASSISTANCE" | "REPLIED" | "RESOLVED";

@Entity("request")
export class Request {
  @PrimaryGeneratedColumn() id: number;

  @Column() status: RequestStatus;

  @OneToMany(type => Message, message => message.request)
  messages: Message[];
}
