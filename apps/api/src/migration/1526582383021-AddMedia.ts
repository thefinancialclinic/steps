import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from "typeorm";
import { DEFAULT_ECDH_CURVE } from "tls";
import { TableCheck } from "typeorm/schema-builder/table/TableCheck";

export class AddMedia1526582383021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "media",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "title", type: "text" },
          { name: "category", type: "text" },
          { name: "description", type: "text", isNullable: true },
          { name: "url", type: "text", isNullable: true },
          { name: "type", type: "text", isNullable: true },
          { name: "responses", type: "jsonb", isNullable: true },

          // FKs
          { name: "task_id", type: "int", isNullable: true },
          { name: "step_id", type: "int", isNullable: true },
          { name: "published_by", type: "int", isNullable: true }
        ]
      })
    );

    await queryRunner.createForeignKeys("media", [
      new TableForeignKey({
        columnNames: ["task_id"],
        referencedTableName: "task",
        referencedColumnNames: ["id"]
      }),
      new TableForeignKey({
        columnNames: ["step_id"],
        referencedTableName: "step",
        referencedColumnNames: ["id"]
      })
    ]);

    await queryRunner.createCheckConstraint(
      "media",
      new TableCheck({
        name: "check_enum_media_type",
        columnNames: ["type"],
        expression:
          "type IN ('TASK_CONTENT', 'TASK_RESOURCE', 'STORY', 'GENERAL_EDUCATION')"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropCheckConstraint("media", "check_enum_media_type");

    // opts are:
    // if exists = true,
    // drop FKs = true,
    // drop indices = true
    await queryRunner.dropTable("media", true, true, true);
  }
}
