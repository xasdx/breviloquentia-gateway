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
        res.status(500)
        return res.send(`No service is registered on path ${path}`)
      }

      if (matchingPaths.length > 1) {
        res.status(500)
        console.log(`Found multiple services registered on path ${path}:\n${matchingPaths.map(s => `${s.name} - ${s.path}`).join("\n")} `)
        return res.send(`Found multiple services registered on path ${path}`)
      }

      let matchingService = matchingPaths[0]

      console.log(`routing ${req.method} ${req.path} to matching service ${matchingService.name}`)

      request(`${matchingService.url}${matchingService.path}`, (err, response, body) => {
        if (err) {
          res.status(500)
          return res.send(err)
        }

        let statusCode = response || response.statusCode

        res.status(statusCode || 500)
        res.send(body)
      })
    })
  }
}
