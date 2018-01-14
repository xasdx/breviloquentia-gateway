import { Controller, Get, Post, Body } from "@nestjs/common"
import { ServiceDto } from "./dto/service.dto"
import { ServiceService } from "../service/service.service"

@Controller("services")
export class ServiceController {
  
  constructor(private readonly service: ServiceService) {}
  
  @Get()
  async findAll(): Promise<Service[]> { this.service.findAll() }
  
  @Post()
  async create(@Body() dto: ServiceDto) { this.service.create(dto) }
}
