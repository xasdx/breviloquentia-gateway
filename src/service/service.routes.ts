import { Request, Response, Router } from "express"
import Service from "./service.service"

export default class ServiceRoutes {

  public static create(router: Router, service: Service) {

    router.get("/services", async (req: Request, res: Response) => {
      res.send(await service.findAll())
    })

    router.post("/services", async (req: Request, res: Response) => {
      res.send(service.create(req.body))
    })
  }
}
