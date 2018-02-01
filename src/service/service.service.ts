import { Connection, Repository } from "typeorm"
import { Service } from "./service.model"

export default class ServiceService {
  
  private repository: Repository<Service>

  public static create(connection: Connection): ServiceService {
    return new ServiceService(connection)
  }

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Service)
  }

  async create(service: Service) {
    return this.repository.save(service)
  }

  async findAll() {
    return this.repository.find()
  }
}
