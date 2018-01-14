import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ServiceController } from "./controller/service.controller"
import { ServiceService } from "./service/service.service"

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [ServiceController],
  components: [ServiceService]
})
export class ApplicationModule {}
