import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ServiceController } from "./controller/service.controller"
import { ServiceService } from "./service/service.service"

let typeOrm = TypeOrmModule.forRoot({
  type: "mysql",
  host: process.env["DB_HOST"] || "localhost",
  port: 3306,
  username: process.env["DB_USER"] || "root",
  password: process.env["DB_PASS"] || "root",
  database: "test",
  entities: [__dirname + "/model/*.model.ts"],
  synchronize: true
})

@Module({
  imports: [typeOrm],
  controllers: [ServiceController],
  components: [ServiceService]
})
export class ApplicationModule {}
