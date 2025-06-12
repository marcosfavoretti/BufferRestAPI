import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import * as path from "path";
config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mssql',
            logging: ['error', 'warn', 'query'],
            database: process.env.MYSQLDATABASEDATABASE,
            port: +process.env.MYSQLPORT,
            username: process.env.MYSQLDATABASEUSER,
            password: process.env.MYSQLDATABASENHA,
            host: process.env.MYSQLDATABASEHOST,
            synchronize: false,
            options: {
                trustServerCertificate: true,
                cancelTimeout: 1000*60,
                connectTimeout: 1000*60,
            },
            requestTimeout: 1000*120,
            entities: [
                path.resolve(__dirname, '../modules/**/@core/entities/*.entity{.ts,.js}')
            ]
        })
    ],
})
export class SqlConfigModule { }