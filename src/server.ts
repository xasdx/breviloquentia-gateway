import * as bodyParser from "body-parser"
import * as express from "express"
import { Router } from "express-serve-static-core";

export default class Server {

  private app: express.Application

  public static create(routes: Router, config: Function): Server {
    return new Server(routes, config)
  }
  
  constructor(routes: Router, config: Function) {
    this.app = express()
    config(this.app)
    this.app.use(routes)
  }

  public start() {
    this.app.listen(3210)
  }
}
