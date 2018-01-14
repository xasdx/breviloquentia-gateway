import * as express from "express"
import * as request from "supertest"
import { Test } from "@nestjs/testing"
import {createConnection} from "typeorm"
import { ApplicationModule } from "../src/app.module"
import { Service } from "../src/model/service.model"

describe("Service API", () => {
  
  let server = express()
  let db = null
  
  beforeAll(async () => {
    let module = await Test.createTestingModule({ imports: [ApplicationModule] }).compile()
    let app = module.createNestApplication(server)
    app.init()
    db = await createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "test",
      entities: [__dirname + "../src/model/*.model.ts"],
      synchronize: true
    })
  })
  
  beforeEach(async () => { db.getRepository(Service).clear() })
  
  it("Handles GET /services", () => request(server).get("/services").expect(200).expect([{}]))
  
  it("Handles POST /services", () => request(server).post("/services").expect(201).expect({}))
})
