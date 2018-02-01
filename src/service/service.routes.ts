import { Request, Response, Router } from "express"
import Service from "./service.service"

export default class ServiceRoutes {

  public static create(router: Router, service: Service) {

    router.get("/", async (req: Request, res: Response) => service.findAll())
    router.post("/services", async (req: Request, res: Response) => service.create(req.body))
  }
}
