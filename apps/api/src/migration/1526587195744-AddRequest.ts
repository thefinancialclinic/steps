import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey
} from "typeorm";
import { TableCheck } from "typeorm/schema-builder/table/TableCheck";

export class AddRequest1526587195744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "request",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "status", type: "text" }
        ]
      })
    );

    await queryRunner.createCheckConstraint(
      "request",
      new TableCheck({
        name: "check_request_status_enum",
        columnNames: ["status"],
        expression: "status IN ('NEEDS_ASSISTANCE', 'REPLIED', 'RESOLVED')"
      })
    );

    await queryRunner.addColumn(
      "message",
      new TableColumn({ name: "request_id", type: "int" })
    );

    await queryRunner.createForeignKey(
      "message",
      new TableForeignKey({
        name: "fk_message_request_id",
        columnNames: ["request_id"],
        referencedTableName: "request",
        referencedColumnNames: ["id"]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey("message", "fk_message_request_id");
    await queryRunner.dropColumn("message", "request_id");
    await queryRunner.dropCheckConstraint(
      "request",
      "check_request_status_enum"
    );
    await queryRunner.dropTable("request", true, true, true);
  }
}
