import "mocha"
import * as chai from "chai"
import * as chaiHttp from "chai-http"
import * as mockery from "mockery"

import requestMock from "./mock/request.mock"

mockery.enable({ warnOnReplace: false, warnOnUnregistered: false })
mockery.registerMock("request", requestMock)

import { Service } from "../src/service/service.model"
import Application from "../src/application"
import connectionMockFactory from "./mock/connection.mock"

chai.use(chaiHttp)

let { expect } = chai

let service = Service.create(
  "breviloquentia-post",
  "^\/api\/postmgmt.*$",
  "http://www.hostname.com/api"
)

describe("Service Router", async () => {
  it("Routes http requests to the matching service", async () => {
    let connection = connectionMockFactory({ services: [service] })
    let app = Application.createMocked({ connection }).app
    let res = await chai.request(app).get("/api/postmgmt/posts")
    expect(res.status).to.eq(200)
  })
})
