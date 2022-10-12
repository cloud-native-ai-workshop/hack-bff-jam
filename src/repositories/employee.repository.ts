import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AccountDsDataSource} from '../datasources';
import {Employee, EmployeeRelations} from '../models';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.EmployeeNumber,
  EmployeeRelations
> {
  constructor(
    @inject('datasources.accountDS') dataSource: AccountDsDataSource,
  ) {
    super(Employee, dataSource);
  }
}
