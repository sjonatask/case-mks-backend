import "reflect-metadata"
import { DataSource } from "typeorm"


console.log(process.env.DB_HOST);

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST as string,
    port: 3306,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_DATA_NAME as string,
    synchronize: false,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    migrationsTableName: "custom_migration_table",
  
})
