import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "src/entities/employee.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {}

  fetchAll() {
    return this.employeeRepo.find();
  }

  fetchOne(id: number) {
    return this.employeeRepo.findOne({
      where: { id },
    });
  }

  create(employee: Partial<Employee>) {
    const newEmployee = this.employeeRepo.create(employee);
    return this.employeeRepo.save(newEmployee);
  }

  async update(id: number, attrs: Partial<Employee>) {
    const employee = await this.fetchOne(id);

    if (!employee) {
      return null;
    }

    Object.assign(employee, attrs);
    return this.employeeRepo.save(employee);
  }

  async delete(id: number) {
    const employee = await this.fetchOne(id);

    if (!employee) {
      return null;
    }

    return this.employeeRepo.remove(employee);
  }
}
