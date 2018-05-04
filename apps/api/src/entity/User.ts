import { Entity, PrimaryGeneratedColumn, Column, ColumnOptions } from "typeorm";

const nullable : ColumnOptions = { nullable: true }

@Entity('user')
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column(nullable) admin_id: number;

  @Column(nullable) coach_id: number;

  @Column(nullable) client_id: number;

  @Column(nullable) auth_token: number;
}
