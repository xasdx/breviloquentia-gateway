import * as express from "express"
import { Connection } from "typeorm"
import Server from "./server"
import expressConfig from "./config/express.config"
import typeOrmConfig from "./config/typeorm.config"
import ServiceRoutes from "./service/service.routes"
import ServiceService from "./service/service.service"
import RouterService from "./router/router.service"

export default class Application {

  public static async create() {
    //let connection: Connection = await typeOrmConfig()

    let repositoryMock = {
      save: (item) => {
        //if (onSave) { onSave(item) }
        return item
      },
      find: () => [{ name: "brevpost", path: "^\/api\/postmgmt\/posts.*$" }]
    }
  
    let connectionMock = {
      getRepository: () => repositoryMock
    }

    return new Application(connectionMock)
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

    let serviceService = ServiceService.create(this.connection)

    ServiceRoutes.create(this.router, serviceService)
    RouterService.create(this.router, serviceService)

    this.server = Server.create(this.router, expressConfig)
    this.app = this.server.application()
  }

  public start() {
    this.server.start()
  }
}
