import { Request, Response, Router } from "express"
import ServiceService from "../service/service.service"

export default class ApplicationRouter {

  public static create(router: Router, service: ServiceService) {

    router.all("/", async (req: Request, res: Response) => res.send(`routing ${req.method} ${req.path} to matching service`))
  }
}
