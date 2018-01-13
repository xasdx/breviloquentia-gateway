import * as express from "express"
import * as request from "supertest"
import { Test } from "@nestjs/testing"
import { ApplicationModule } from "../src/app.module"

describe("Service API", () => {
  
  let server = express()
  
  beforeAll(async () => {
    let module = await Test.createTestingModule({ imports: [ApplicationModule] }).compile()
    let app = module.createNestApplication(server)
    app.init()
  })
  
  it("GET /services", () => request(server).get("/services").expect(200).expect([{}]))
})