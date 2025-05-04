const mongoose = require('mongoose');
const Employee = require('../models/Employee');

describe('Employee Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Employee.deleteMany({});
  });

  test('should create a new employee', async () => {
    const employeeData = {
      name: 'John Doe',
      email: 'john@example.com',
      department: 'Engineering',
      position: 'Software Engineer',
      attendance: 95,
      projects: 5,
    };

    const employee = new Employee(employeeData);
    const savedEmployee = await employee.save();

    expect(savedEmployee._id).toBeDefined();
    expect(savedEmployee.name).toBe(employeeData.name);
    expect(savedEmployee.email).toBe(employeeData.email);
    expect(savedEmployee.department).toBe(employeeData.department);
    expect(savedEmployee.position).toBe(employeeData.position);
    expect(savedEmployee.attendance).toBe(employeeData.attendance);
    expect(savedEmployee.projects).toBe(employeeData.projects);
  });

  test('should not create employee with invalid email', async () => {
    const employeeData = {
      name: 'John Doe',
      email: 'invalid-email',
      department: 'Engineering',
      position: 'Software Engineer',
      attendance: 95,
      projects: 5,
    };

    const employee = new Employee(employeeData);
    await expect(employee.save()).rejects.toThrow();
  });

  test('should not create employee with negative attendance', async () => {
    const employeeData = {
      name: 'John Doe',
      email: 'john@example.com',
      department: 'Engineering',
      position: 'Software Engineer',
      attendance: -10,
      projects: 5,
    };

    const employee = new Employee(employeeData);
    await expect(employee.save()).rejects.toThrow();
  });
}); 