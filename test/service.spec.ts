import * as express from "express"
import * as request from "supertest"
import { Test } from "@nestjs/testing"
import "jest-to-match-shape-of"
import { Database } from "./db.util"
import { ApplicationModule } from "../src/app.module"

describe("Service API", () => {

  let server = express()
  let table = new Database("test").table("service")

  beforeAll(async () => {
    let module = await Test.createTestingModule({ imports: [ApplicationModule] }).compile()
    let app = module.createNestApplication(server)
    await app.init()
  })

  beforeEach(done => table.clean(done))

  it("Handles GET /services", done => {
    let service = { name: "breviloquentia-post" }
    table.insertRow(service, async (err, res) => {
      if (err) throw err
      let response = await request(server).get("/services").expect(200)
      expect(response.body[0]).toMatchShapeOf({ id: 0, name: "service" })
      expect(response.body[0].name).toBe(service.name)
      done()
    })
  })

  it("Handles POST /services", async (done) => {
    let service = { name: "breviloquentia-post" }
    let response = await request(server).post("/services").send(service).expect(201)
    expect(response.body).toMatchShapeOf({ id: 0, name: "service" })
    expect(response.body.name).toBe(service.name)
    table.allRows((err, res) => {
      if (err) throw err
      expect(res[0].name).toBe(service.name)
      done()
    })
  })
})
