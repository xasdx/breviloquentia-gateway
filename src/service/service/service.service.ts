import { Component } from "@nestjs/common"
import { Service } from "../model/service.model"
import { Connection, Repository } from "typeorm"

@Component()
export class ServiceService {

  repository: Repository<Service>

  constructor(private readonly connection: Connection) {
    this.repository = connection.getRepository(Service)
  }

  async create(service: Service) {
    return this.repository.save(service)
  }

  async findAll() {
    return this.repository.find()
  }
}
