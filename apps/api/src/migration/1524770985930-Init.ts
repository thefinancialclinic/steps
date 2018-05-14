import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class init1524770985930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "admin",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "org_id", type: "int" },
        ]
      }),
      true,
      false
    );

    await queryRunner.createTable(
      new Table({
        name: "client",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "full_name", type: "text" },
          { name: "org_id", type: "int" },
          { name: "coach_id", type: "int" },

        ]
      }),
      true,
      false
    );

    await queryRunner.createTable(
      new Table({
        name: "coach",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "org_id", type: "int" },
        ]
      }),
      true,
      false
    );

    await queryRunner.createTable(
      new Table({
        name: "content",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "org_id", type: "int" },
          { name: "admin_id", type: "int" },
          { name: "task_template_id", type: "int" },
          { name: "file_id", type: "int" },
        ]
      }),
      true,
      false
    );

    await queryRunner.createTable(
      new Table({
        name: "file",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "org_id", type: "int" },
        ]
      }),
      true,
      false
    );

    await queryRunner.createTable(
      new Table({
        name: "message",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "coach_id", type: "int" },
          { name: "client_id", type: "int" },
          { name: "org_id", type: "int" },
        ]
      }),
      true,
      false
    );

    await queryRunner.createTable(
      new Table({
        name: "org",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "name", type: "text" },
          { name: "botPhone", type: "text" },
        ]
      }),
      true,
      false
    );

    await queryRunner.createTable(
      new Table({
        name: "task_template",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "org_id", type: "int" },
          { name: "admin_id", type: "int" },
        ]
      }),
      true,
      false
    );

    await queryRunner.createTable(
      new Table({
        name: "task",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "steps", type: "jsonb" },
          { name: "content", type: "text" },
          { name: "client_id", type: "int" },
          { name: "org_id", type: "int" },
        ]
      }),
      true,
      false
    );


    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "admin_id", type: "int" },
          { name: "coach_id", type: "int" },
          { name: "client_id", type: "int" },
          { name: "auth_token", type: "text" },
          // email, phone number maintained by external auth service
        ]
      }),
      true,
      false
    );

  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // drop all FK constraints
    await queryRunner.query(`
      SELECT 'ALTER TABLE '||table_name||' DROP CONSTRAINT '||constraint_name||';'
      FROM information_schema.constraint_table_usage
      WHERE true
    `);

    // drop individual tables
    await queryRunner.query(`
      DROP TABLE IF EXISTS admin         CASCADE;
      DROP TABLE IF EXISTS client        CASCADE;
      DROP TABLE IF EXISTS coach         CASCADE;
      DROP TABLE IF EXISTS content       CASCADE;
      DROP TABLE IF EXISTS file          CASCADE;
      DROP TABLE IF EXISTS message       CASCADE;
      DROP TABLE IF EXISTS org           CASCADE;
      DROP TABLE IF EXISTS task_template CASCADE;
      DROP TABLE IF EXISTS task          CASCADE;
      DROP TABLE IF EXISTS "user"        CASCADE;
    `);

  }
}
