import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Employee} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository : EmployeeRepository,
  ) {}

  @post('/employees')
  @response(200, {
    description: 'Employee model instance',
    content: {'application/json': {schema: getModelSchemaRef(Employee)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {
            title: 'NewEmployee',
            exclude: ['EmployeeNumber'],
          }),
        },
      },
    })
    employee: Omit<Employee, 'EmployeeNumber'>,
  ): Promise<Employee> {
    return this.employeeRepository.create(employee);
  }

  @get('/employees/count')
  @response(200, {
    description: 'Employee model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.count(where);
  }

  @get('/employees-test')
  async findNames(): Promise<Object> {
    const employees = await this.employeeRepository.find({});
    let employeesData: any = [];
    let employeesValuesData: any = [];
    let inputData: any = {
      input_data: [
        {
          fields: ["Age",
          "BusinessTravel",
          "DailyRate",
          "Department",
          "DistanceFromHome",
          "Education",
          "EducationField",
          "EnvironmentSatisfaction",
          "Gender",
          "HourlyRate",
          "JobInvolvement",
          "JobLevel",
          "JobRole",
          "JobSatisfaction",
          "MaritalStatus",
          "MonthlyIncome",
          "MonthlyRate",
          "NumCompaniesWorked",
          "Over18",
          "OverTime",
          "PercentSalaryHike",
          "PerformanceRating",
          "RelationshipSatisfaction",
          "StandardHours",
          "StockOptionLevel",
          "TotalWorkingYears",
          "TrainingTimesLastYear",
          "WorkLifeBalance",
          "YearsAtCompany",
          "YearsInCurrentRole",
          "YearsSinceLastPromotion",
          "YearsWithCurrManager"],
          values: []
        }
      ]
    }
    employees.forEach((employee) => {
      let employeeData = {
        EmployeeNumber: employee['EmployeeNumber'],
        EmployeeName: employee['EmployeeName']
      }
      let employeeInputData = [
        employee["Age"],
        employee["BusinessTravel"],
        employee["DailyRate"],
        employee["Department"],
        employee["DistanceFromHome"],
        employee["Education"],
        employee["EducationField"],
        employee["EnvironmentSatisfaction"],
        employee["Gender"],
        employee["HourlyRate"],
        employee["JobInvolvement"],
        employee["JobLevel"],
        employee["JobRole"],
        employee["JobSatisfaction"],
        employee["MaritalStatus"],
        employee["MonthlyIncome"],
        employee["MonthlyRate"],
        employee["NumCompaniesWorked"],
        employee["Over18"] ? "1" : "0",
        employee["OverTime"] ? "1" : "0",
        employee["PercentSalaryHike"],
        employee["PerformanceRating"],
        employee["RelationshipSatisfaction"],
        employee["StandardHours"],
        employee["StockOptionLevel"],
        employee["TotalWorkingYears"],
        employee["TrainingTimesLastYear"],
        employee["WorkLifeBalance"],
        employee["YearsAtCompany"],
        employee["YearsInCurrentRole"],
        employee["YearsSinceLastPromotion"],
        employee["YearsWithCurrManager"]
      ]
      employeesData.push(employeeData)
      employeesValuesData.push(employeeInputData)
    })
    inputData['input_data'][0]['values'] = employeesValuesData;
    
    return inputData;
  }

  @get('/employees')
  @response(200, {
    description: 'Array of Employee model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Employee, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Employee) filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.employeeRepository.find(filter);
  }

  @patch('/employees')
  @response(200, {
    description: 'Employee PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
    @param.where(Employee) where?: Where<Employee>,
  ): Promise<Count> {
    return this.employeeRepository.updateAll(employee, where);
  }

  @get('/employees/{id}')
  @response(200, {
    description: 'Employee model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Employee, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Employee, {exclude: 'where'}) filter?: FilterExcludingWhere<Employee>
  ): Promise<Employee> {
    return this.employeeRepository.findById(id, filter);
  }

  @patch('/employees/{id}')
  @response(204, {
    description: 'Employee PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
  ): Promise<void> {
    await this.employeeRepository.updateById(id, employee);
  }

  @put('/employees/{id}')
  @response(204, {
    description: 'Employee PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() employee: Employee,
  ): Promise<void> {
    await this.employeeRepository.replaceById(id, employee);
  }

  @del('/employees/{id}')
  @response(204, {
    description: 'Employee DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.employeeRepository.deleteById(id);
  }
}
