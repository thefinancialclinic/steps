import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class init1524770985930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "task",
        columns: [
          { name: "id", type: "int", isPrimary: true },
          { name: "steps", type: "jsonb" },
          { name: "content", type: "text" }
        ]
      }),
      true,
      false
    );

    await queryRunner.createTable(
      new Table({
        name: "client",
        columns: [{ name: "id", type: "int", isPrimary: true }]
      }),
      true,
      false
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("task");
    await queryRunner.dropTable("client");
  }
}
