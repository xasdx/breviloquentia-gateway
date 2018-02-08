import * as express from "express"
import Server from "../src/server"
import expressConfig from "../src/config/express.config"
import ServiceRoutes from "../src/service/service.routes"
import ServiceService from "../src/service/service.service"

export default ({ connection }) => {
  let router = express.Router()
  ServiceRoutes.create(router, ServiceService.create(connection))
  let server = Server.create(router, expressConfig)
  return server.application()
}
