import * as express from "express"
import * as request from "supertest"
import { toMatchOneOf, toMatchShapeOf } from "jest-to-match-shape-of"
expect.extend({ toMatchOneOf, toMatchShapeOf })
import { Database } from "./db.util"
import application from "../src/main"

describe("Service API", async () => {

  let table = new Database("test").table("service")

  beforeEach(done => table.clean(done))

  it("Handles GET /services", async (done) => {
    let service = { name: "breviloquentia-post" }
    table.insertRow(service, async (err, res) => {
      if (err) throw err
      let response = await request("/").get("/services").expect(200)
      expect(response.body[0]).toMatchShapeOf({ id: 0, name: "service" })
      expect(response.body[0].name).toBe(service.name)
      done()
    })
    done()
  })

  it("Handles POST /services", async (done) => {
    // let service = { name: "breviloquentia-post" }
    // let response = await request(app).post("/services").send(service).expect(201)
    // expect(response.body).toMatchShapeOf({ id: 0, name: "service" })
    // expect(response.body.name).toBe(service.name)
    // table.allRows((err, res) => {
    //   if (err) throw err
    //   expect(res[0].name).toBe(service.name)
    //   done()
    // })
    done()
  })
})
