import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';
import { TableCheck } from 'typeorm/schema-builder/table/TableCheck';

export class AddStep1526420244633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'step',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'text', type: 'text' },
          { name: 'task_id', type: 'int' },
          { name: 'note', type: 'text' },
        ]
      }),
      true,
      false
    );

    await queryRunner.dropColumn('task', 'steps');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('step', true, false, true);
    await queryRunner.addColumn('task',
      new TableColumn({ name: 'steps', type: 'jsonb' })
    );
  }
}
