import * as express from "express"
import { Connection } from "typeorm"
import Server from "./server"
import expressConfig from "./config/express.config"
import typeOrmConfig from "./config/typeorm.config"
import ServiceRoutes from "./service/service.routes"
import ServiceService from "./service/service.service"

async function bootstrap() {
  let connection: Connection = await typeOrmConfig()
  let router: express.Router = express.Router()
  ServiceRoutes.create(router, ServiceService.create(connection))
  Server.create(router, expressConfig).start()
}

bootstrap()
