import { Controller, Get, Post, Body } from "@nestjs/common"

@Controller("services")
export class ServiceController {
  
  @Get()
  async findAll() { return [{}] }
  
  @Post()
  async create(@Body() dto: ServiceDto) {}
}
