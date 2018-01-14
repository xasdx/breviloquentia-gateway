import { Component } from "@nestjs/common"
import { Service } from "../model/service.model"

@Component()
export class ServiceService {
  
  private readonly services: Service[] = []
  
  create(service: Service) {
    this.services.push(service)
  }
  
  findAll(): Service[] {
    return this.services
  }
}
