import { Controller, Get, Post } from "@nestjs/common"

@Controller("services")
export class ServiceController {
  
  @Get()
  async findAll() { return [{}] }
  
  @Post()
  async create() {}
}
