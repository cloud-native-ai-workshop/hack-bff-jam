import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Employee extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  EmployeeNumber: number;

  @property({
    type: 'number'
  })
  Age: number;

  @property({
    type: 'string'
  })
  BusinessTravel: string;

  @property({
    type: 'number'
  })
  DailyRate: number;

  @property({
    type: 'string'
  })
  Department: string;

  @property({
    type: 'number'
  })
  DistanceFromHome: number;

  @property({
    type: 'number'
  })
  Education: number;

  @property({
    type: 'string'
  })
  EducationField: string;

  @property({
    type: 'number'
  })
  EnvironmentSatisfaction: number;

  @property({
    type: 'string'
  })
  Gender: string;

  @property({
    type: 'number'
  })
  HourlyRate: number;

  @property({
    type: 'number'
  })
  JobInvolvement: number;

  @property({
    type: 'number'
  })
  JobLevel: number;

  @property({
    type: 'string'
  })
  JobRole: string;

  @property({
    type: 'number'
  })
  JobSatisfaction: number;

  @property({
    type: 'string'
  })
  MaritalStatus: string;

  @property({
    type: 'number'
  })
  MonthlyIncome: number;

  @property({
    type: 'number'
  })
  MonthlyRate: number;

  @property({
    type: 'number'
  })
  NumCompaniesWorked: number;

  @property({
    type: 'number'
  })
  Over18: number;

  @property({
    type: 'number'
  })
  OverTime: number;

  @property({
    type: 'number'
  })
  PercentSalaryHike: number;

  @property({
    type: 'number'
  })
  PerformanceRating: number;

  @property({
    type: 'number'
  })
  RelationshipSatisfaction: number;

  @property({
    type: 'number'
  })
  StandardHours: number;

  @property({
    type: 'number'
  })
  StockOptionLevel: number;

  @property({
    type: 'number'
  })
  TotalWorkingYears: number;

  @property({
    type: 'number'
  })
  TrainingTimesLastYear: number;

  @property({
    type: 'number'
  })
  WorkLifeBalance: number;

  @property({
    type: 'number'
  })
  YearsAtCompany: number;

  @property({
    type: 'number'
  })
  YearsInCurrentRole: number;

  @property({
    type: 'number'
  })
  YearsSinceLastPromotion: number;

  @property({
    type: 'number'
  })
  YearsWithCurrManager: number;

  @property({
    type: 'string',
    required: true,
  })
  EmployeeName: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
