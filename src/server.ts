import * as bodyParser from "body-parser"
import * as express from "express"

export default class Server {

  public static create(routes: express.Router, config: (app: express.Application) => void): Server {
    return new Server(routes, config)
  }

  private app: express.Application

  constructor(routes: express.Router, config: (app: express.Application) => void) {
    this.app = express()
    config(this.app)
    this.app.use(routes)
  }

  public start() {
    this.app.listen(3210)
    console.log("server is up")
  }

  public application() {
    return this.app
  }
}
