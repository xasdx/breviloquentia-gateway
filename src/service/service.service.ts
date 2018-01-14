import { Component } from "@nestjs/common"
import { Service } from "../model/service.model"
import { Connection } from "typeorm"

@Component()
export class ServiceService {

  constructor(private readonly connection: Connection) {
    this.repository = connection.getRepository(Service)
  }
  
  async create(service: Service) {
    await this.repository.save(service)
  }
  
  async findAll(): Service[] {
    return await this.repository.find()
  }
}
