import { Test } from "@nestjs/testing";
import { EmployeeService } from "src/services/employee.service";
import { EmployeeController } from "src/controllers/employee.controller";
import { Employee } from "src/entities/employee.entity";

describe("EmployeeController", () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  const singleEmployee = {
    id: 1,
    EmpId: "rapidx",
    EmpName: "rapidx",
  } as Employee;

  const multipleEmployees = [
    {
      id: 1,
      EmpId: "rapidx",
      EmpName: "rapidx",
    },
  ] as Employee[];

  beforeEach(async () => {
    const mockService = {
      fetchAll: () => Promise.resolve(multipleEmployees),
      fetchOne: (id: number) => Promise.resolve(singleEmployee),
      create: (employee: Employee) => Promise.resolve(employee),
      delete: (id: number) => Promise.resolve(singleEmployee),
      update: (id: number, employee: Partial<Employee>) => Promise.resolve(employee),
    };

    const module = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(EmployeeController);
    service = module.get(EmployeeService);
  });

  describe("fetchAll", () => {
    it("should fetch all employees", async () => {
      const employees = await controller.fetchAll();
      expect(employees.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one employee for the given id", async () => {
      const employee = await controller.fetchOne("1");
      expect(employee.EmpId).toEqual(singleEmployee.EmpId);
      expect(employee.EmpName).toEqual(singleEmployee.EmpName);
    });
  });

  describe("Create employee", () => {
    it("should create a employee", async () => {
      const employee = await controller.create(singleEmployee);
      expect(employee.EmpId).toEqual(singleEmployee.EmpId);
      expect(employee.EmpName).toEqual(singleEmployee.EmpName);
    });
  });

  describe("Update employee", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, employee: Partial<Employee>) => Promise.resolve(null);
      await expect(controller.update("1", singleEmployee)).rejects.toThrow();
    });

    it("should return one employee for the given id", async () => {
      const employee = await controller.update("1", singleEmployee);
      expect(employee.EmpId).toEqual(singleEmployee.EmpId);
      expect(employee.EmpName).toEqual(singleEmployee.EmpName);
    });
  });

  describe("Delete employee", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one employee for the given id", async () => {
      const employee = await controller.delete("1");
      expect(employee.EmpId).toEqual(singleEmployee.EmpId);
      expect(employee.EmpName).toEqual(singleEmployee.EmpName);
    });
  });
});
