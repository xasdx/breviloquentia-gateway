import { Module } from "@nestjs/common"
import { ServiceController } from "./controller/service.controller"

@Module({ imports: [], controllers: [ServiceController], components: [] })
export class ApplicationModule {}
