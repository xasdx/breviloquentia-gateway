import "mocha"
import * as chai from "chai"
import * as chaiHttp from "chai-http"
import { Service } from "../src/service/service.model"
import Application from "../src/main"
import connectionMockFactory from "./mock/connection.mock"

chai.use(chaiHttp)

let { expect } = chai

let service = Service.create(
  "breviloquentia-post",
  "\/api\/postmgmt",
  "http://www.hostname.com/api"
)

describe("Service API", async () => {
  it("Handles GET /services", async () => {
    let connection = connectionMockFactory({ services: [service] })
    let app = Application.createMocked({ connection }).app
    let res = await chai.request(app).get("/services")
    expect(res.status).to.eq(200)
    expect(res.body[0].name).to.eq(service.name)
    expect(res.body[0].path).to.eq(service.path)
    expect(res.body[0].url).to.eq(service.url)
  })

  it("Handles POST /services", async () => {
    let connection = connectionMockFactory({ onSave: (srvc) => {
      expect(srvc.name).to.eq(service.name)
    }})
    let app = Application.createMocked({ connection }).app
    let res = await chai.request(app).post("/services").send({ name: service.name })
    expect(res.status).to.eq(201)
    expect(res.body.name).to.eq(service.name)
  })
})
