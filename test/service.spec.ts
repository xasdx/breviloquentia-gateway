import "mocha"
import * as chai from "chai"
import * as chaiHttp from "chai-http"
import Application from "../src/main"

chai.use(chaiHttp)

let { expect } = chai

describe("Service API", () => {

  //let table = new Database("test").table("service")
  //beforeEach(done => table.clean(done))
  
  it("Handles GET /services", async () => {
    let service = { name: "breviloquentia-post" }
    let application: Application = await Application.create()
    let res = await chai.request(application.app).get("/services")
    expect(res.status).to.eq(200)
    return Promise.resolve()
    
      // table.insertRow(service, async (err, res) => {
    //   if (err) throw err
    //   let response = await request("/").get("/services").expect(200)
    //   expect(response.body[0]).toMatchShapeOf({ id: 0, name: "service" })
    //   expect(response.body[0].name).toBe(service.name)
    //   done()
    // })
    // done()
  }).timeout(6000)
  
  // it("Handles POST /services", async (done) => {
  //   let service = { name: "breviloquentia-post" }
  //   let response = await request(app).post("/services").send(service).expect(201)
  //   expect(response.body).toMatchShapeOf({ id: 0, name: "service" })
  //   expect(response.body.name).toBe(service.name)
  //   table.allRows((err, res) => {
  //     if (err) throw err
  //     expect(res[0].name).toBe(service.name)
  //     done()
  //   })
  //   done()
  // })
})
