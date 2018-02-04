import * as bodyParser from "body-parser"
import * as express from "express"

export default class Server {

  private app: express.Application

  public static create(routes: express.Router, config: Function): Server {
    return new Server(routes, config)
  }

  constructor(routes: express.Router, config: Function) {
    this.app = express()
    config(this.app)
    this.app.use(routes)
  }

  public start() {
    this.app.listen(3210)
  }

  public application() {
    return this.app
  }
}
