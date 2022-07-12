import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1657423387163 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXIST "uuid-ossp"')

        await queryRunner.createTable(new Table({
            name: "MKS_USERS",
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '80',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }));        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('MKS_USERS');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"')
    }
}
