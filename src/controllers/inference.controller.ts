import { inject } from "@loopback/core";
import { repository } from "@loopback/repository";
import { param, response, ResponseObject, get } from "@loopback/rest";
import { EmployeeRepository } from "../repositories";
// import { Inference, Predictions } from "../services";
import { Inference } from "../services";


// interface PredictionsPayload {
//   fields: string[],
//   values: (string|number)[][]
// }

/**
 * OpenAPI body for predictions
 */
// const PREDICTIONS_BODY: RequestBodyObject = {
//   description: 'Predictions Body',
//   content: {
//     'application/json': {
//       schema: {
//         type: 'object',
//         title: 'PredictionsBody',
//         properties: {
//           fields: {
//             type: 'array',
//             example: [
//               "ID",
//               "LONGDISTANCE",
//               "INTERNATIONAL",
//               "LOCAL",
//               "DROPPED",
//               "PAYMETHOD",
//               "LOCALBILLTYPE",
//               "LONGDISTANCEBILLTYPE",
//               "USAGE",
//               "RATEPLAN",
//               "GENDER",
//               "STATUS",
//               "CHILDREN",
//               "ESTINCOME",
//               "CAROWNER",
//               "AGE"
//             ]
//           },
//           values: {
//             type: 'array',
//             items: {
//               type: 'array',
//               example: [
//                 1,
//                 28,
//                 0,
//                 60,
//                 0,
//                 "Auto",
//                 "FreeLocal",
//                 "Standard",
//                 89,
//                 4,
//                 "F",
//                 "M",
//                 1,
//                 23000,
//                 "N",
//                 45
//               ]
//             }
//           },
//         },
//       },
//     },
//   },
// };

/**
 * OpenAPI response for predictions
 */
const PREDICTIONS_RES: ResponseObject = {
  description: 'Predictions Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PredictionsResponse',
        properties: {
          predictions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                fields: {
                  type: 'array',
                  example: [
                    "prediction",
                    "probability"
                  ]
                },
                values: {
                  type: 'array',
                  example: [
                    "F",
                    [
                      0.9753829214790144,
                      0.024617078520985585
                    ]
                  ]
                }
              }
            }
          },
        },
      },
    },
  },
};

export class InferenceController {
  constructor(
    @inject('services.Inference')
    protected inferenceService: Inference,
    @repository(EmployeeRepository)
    public employeeRepository : EmployeeRepository,
  ) {}

  @get('/inference/predictions')
  @response(200, PREDICTIONS_RES)
  async getPredictions(
    // @requestBody(PREDICTIONS_BODY) payload: PredictionsPayload,
    @param.query.string('username') username: string,
    @param.query.string('password') password: string,
    @param.query.string('model') model: string,
    @param.query.string('version') version?: string,
  // ): Promise<Predictions> {
  ): Promise<Object> {
    const employees = await this.employeeRepository.find({});
    const employeesData: {EmployeeNumber: number, EmployeeName: string}[] = [];
    // eslint-disable-next-line
    const employeesValuesData: any = [];
    const inputData = [
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
    
    employees.forEach((employee) => {
      const employeeData = {
        EmployeeNumber: employee['EmployeeNumber'],
        EmployeeName: employee['EmployeeName']
      }
      const employeeInputDataPrediction = [
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
      employeesValuesData.push(employeeInputDataPrediction)
    })
    inputData[0]['values'] = employeesValuesData;

    const token: string = (await this.inferenceService.getToken(username, password)).token;
    const predictions = await this.inferenceService.getPredictions(model, version ?? (new Date()).toISOString().split('T')[0], [inputData[0]], token);
    return {employeesData, predictions}
    // return this.inferenceService.getPredictions(model, version ?? (new Date()).toISOString().split('T')[0], [inputData[0]], token);
  }

}
