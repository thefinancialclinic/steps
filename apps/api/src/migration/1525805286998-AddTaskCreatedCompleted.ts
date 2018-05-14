import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addTaskCreatedCompleted1525805286998
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns("task", [
      new TableColumn({ name: "dateCreated", type: "date" }),
      new TableColumn({ name: "dateCompleted", type: "date", isNullable: true })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumns("task", [
      new TableColumn({ name: "dateCreated", type: "date" }),
      new TableColumn({ name: "dateCompleted", type: "date" }),
    ]);
  }
}
