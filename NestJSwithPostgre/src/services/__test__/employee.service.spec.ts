import { Employee } from "src/entities/employee.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { EmployeeService } from "src/services/employee.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("EmployeeService", () => {
  let service: EmployeeService;
  let repo: Repository<Employee>;

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
    const mockRepo = {
      find: () => Promise.resolve(multipleEmployees),
      findOne: (id: number) => Promise.resolve(singleEmployee),
      save: (employee: Employee) => Promise.resolve(employee),
      create: (employee: Employee) => employee,
      remove: (employee: Employee) => Promise.resolve(employee),
    };

    const module = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(EmployeeService);
    repo = module.get(getRepositoryToken(Employee));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all employees from database", async () => {
      const employees = await service.fetchAll();
      expect(employees.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one employee from the database", async () => {
      const employee = await service.fetchOne(1);
      expect(employee.EmpId).toEqual(singleEmployee.EmpId);
      expect(employee.EmpName).toEqual(singleEmployee.EmpName);
    });
    it("should fetch no employees from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const employee = await service.fetchOne(1);
      expect(employee).toBeNull();
    });
  });

  describe("Create employee", () => {
    it("should create the employee of the specified values", async () => {
      const employee = await service.create(singleEmployee);
      expect(employee.EmpId).toEqual(singleEmployee.EmpId);
      expect(employee.EmpName).toEqual(singleEmployee.EmpName);
    });
  });

  describe("Update employee", () => {
    it("should return null when employee is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const employee = await service.update(1, {});
      expect(employee).toBeNull();
    });

    it("should update the employee of the specified id", async () => {
      const employee = await service.update(1, singleEmployee);
      expect(employee.EmpId).toEqual(singleEmployee.EmpId);
      expect(employee.EmpName).toEqual(singleEmployee.EmpName);
    });
  });

  describe("Delete employee", () => {
    it("should return null when employee is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const employee = await service.delete(1);
      expect(employee).toBeNull();
    });

    it("should delete the employee of the specified id", async () => {
      const employee = await service.delete(1);
      expect(employee.id).toEqual(1);
    });
  });
});
