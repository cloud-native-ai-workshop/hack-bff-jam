import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AccountDsDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.EmployeeNumber,
  UserRelations
> {
  constructor(
    @inject('datasources.accountDS') dataSource: AccountDsDataSource,
  ) {
    super(User, dataSource);
  }
}
