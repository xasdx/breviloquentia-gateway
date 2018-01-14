import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ServiceController } from "./controller/service.controller"
import { ServiceService } from "./service/service.service"

let typeOrm = TypeOrmModule.forRoot({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
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
