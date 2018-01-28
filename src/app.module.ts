import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ServiceModule } from "./service/service.module"

let typeOrm = TypeOrmModule.forRoot({
  type: "mysql",
  host: process.env["DB_HOST"] || "localhost",
  port: 3306,
  username: process.env["DB_USER"] || "root",
  password: process.env["DB_PASS"] || null,
  database: "test",
  entities: [__dirname + "/**/*.model.ts"],
  synchronize: true
})

@Module({ imports: [typeOrm, ServiceModule] })
export class ApplicationModule { }
