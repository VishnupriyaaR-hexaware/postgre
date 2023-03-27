import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { Employee } from "src/entities/employee.entity";
import { EmployeeService } from "src/services/employee.service";

@Controller("/employee")
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get("")
  fetchAll() {
    return this.employeeService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const employee = await this.employeeService.fetchOne(+id);

    if (!employee) throw new NotFoundException("Employee not found");

    return employee;
  }

  @Post()
  create(@Body() employee: Employee) {
    return this.employeeService.create(employee);
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() employee: Employee) {
    const receivedEmployee = await this.employeeService.update(+id, employee);

    if (!receivedEmployee) throw new NotFoundException("Employee not found");

    return receivedEmployee;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedEmployee = await this.employeeService.delete(+id);

    if (!receivedEmployee) throw new NotFoundException("Employee not found");

    return receivedEmployee;
  }
}
