import "mocha"
import * as chai from "chai"
import * as chaiHttp from "chai-http"
import { Connection, Repository } from "typeorm"
import Application from "../src/main"
import { Service } from "../src/service/service.model"

chai.use(chaiHttp)

let { expect } = chai

let application: Application
let repository: Repository<Service>

let app = async () => {
  if (!application) {
    application = await Application.create()
    repository = await application.connection.getRepository(Service)
  }
  return {
    express: application.app,
    repository
  }
}

describe("Service API", async () => {

  let service = Service.create("breviloquentia-post")

  it("Handles GET /services", async () => {
    let t = await app()
    await t.repository.save(service)
    let res = await chai.request(t.express).get("/services")
    expect(res.status).to.eq(200)
    //expect(res.body[0]).toMatchShapeOf({ id: 0, name: "service" })
    expect(res.body[0].name).to.eq(service.name)
  })
  
  it("Handles POST /services", async () => {
    let t = await app()
    let res = await chai.request(t.express).post("/services").send({ name: service.name })
    // expect(response.body).toMatchShapeOf({ id: 0, name: "service" })
    expect(res.status).to.eq(201)
    expect(res.body.name).to.eq(service.name)
    let services = await t.repository.find()
    expect(services[0].name).to.eq(service.name)
  })
})
