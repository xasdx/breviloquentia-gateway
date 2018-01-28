import { Module } from "@nestjs/common"
import { ServiceController } from "./controller/service.controller"
import { ServiceService } from "./service/service.service"

@Module({
  controllers: [ServiceController],
  components: [ServiceService]
})
export class ServiceModule { }
