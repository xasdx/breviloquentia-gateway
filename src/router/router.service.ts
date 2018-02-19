import { Request, Response, Router } from "express"
import * as request from "request"
import ServiceService from "../service/service.service"

export default class ApplicationRouter {

  public static create(router: Router, service: ServiceService) {

    router.all("*", async (req: Request, res: Response) => {
      let path = req.path
      let services = await service.findAll()

      let matchingPaths = services.filter(s => path.match(s.path))

      if (matchingPaths.length === 0) {
        return res.status(500).send(`No service is registered on path ${path}`)
      }

      if (matchingPaths.length > 1) {
        console.log(`Found multiple services registered on path ${path}:\n${matchingPaths.map(s => `${s.name} - ${s.path}`).join("\n")} `)
        return res.status(500).send(`Found multiple services registered on path ${path}`)
      }

      let matchingService = matchingPaths[0]

      console.log(`routing ${req.method} ${req.path} to matching service ${matchingService.name}`)
      
      request(`${matchingService.url}${matchingService.path}`, (err, response, body) => {
        if (err) { return res.status(500).send(err) }
        let statusCode = response && response.statusCode
        return res.status(statusCode || 500).send(body)
      })
    })
  }
}
