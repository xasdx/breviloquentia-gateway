import * as express from "express"
import * as request from "supertest"
import { Test } from "@nestjs/testing"
import { ApplicationModule } from "../src/app.module"
import * as sql from "mysql"

describe("Service API", () => {
  
  let server = express()
  
  let db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
  })
  
  db.connect()
  
  beforeAll(async () => {
    let module = await Test.createTestingModule({ imports: [ApplicationModule] }).compile()
    let app = module.createNestApplication(server)
    app.init()
  })
  
  beforeEach(done => db.query("DELETE FROM service", (err, res) => {
    if (err) throw err
    done()
  }))
  
  it("Handles GET /services", done => {
    let service = { name: "breviloquentia-post" }
    db.query("INSERT INTO service SET ?", service, async (err, res) => {
      if (err) throw err
      let response = await request(server).get("/services").expect(200)
      expect(response.body[0].name).toBe(service.name)
      done()
    })
  })
  
  it("Handles POST /services", async () => {
    let service = { name: "breviloquentia-post" }
    let response = await request(server).post("/services").send(service).expect(201)
    expect(response.body.name).toBe(service.name)
  })
})
