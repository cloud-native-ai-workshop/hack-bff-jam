import { Entity, model, property } from "@loopback/repository";

@model()
export class User extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    EmployeeNumber: number;

    @property({
        type: 'number',
    })
    Age: string;

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
        type: 'string'
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
    MaritalStatys: string;

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
        type: 'string'
    })
    EmployeeName: string;

    constructor(data?: Partial<User>) {
        super(data);
    }
}

export interface UserRelations {
    // describe navigational properties here
  }