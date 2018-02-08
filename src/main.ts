import * as express from "express"
import { Connection } from "typeorm"
import Server from "./server"
import expressConfig from "./config/express.config"
import typeOrmConfig from "./config/typeorm.config"
import ServiceRoutes from "./service/service.routes"
import ServiceService from "./service/service.service"

export default class Application {

  public static async create() {
    let connection: Connection = await typeOrmConfig()
    return new Application(connection)
  }

  public static createMocked({ connection }) {
    return new Application(connection)
  }

  public connection: Connection
  public router: express.Router
  public server: Server
  public app: express.Application

  constructor(connection: Connection) {
    this.connection = connection
    this.router = express.Router()

    ServiceRoutes.create(this.router, ServiceService.create(this.connection))

    this.server = Server.create(this.router, expressConfig)
    this.app = this.server.application()
  }
}
