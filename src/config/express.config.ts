import * as express from "express"
import * as bodyParser from "body-parser"

export default (app: express.Application) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}
