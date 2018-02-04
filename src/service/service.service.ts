import { Connection, Repository } from "typeorm"
import { Service } from "./service.model"

export default class ServiceService {

  public static create(connection: Connection): ServiceService {
    return new ServiceService(connection)
  }

  private repository: Repository<Service>

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Service)
  }

  public async create(service: Service) {
    return await this.repository.save(service)
  }

  public async findAll() {
    return await this.repository.find()
  }
}
