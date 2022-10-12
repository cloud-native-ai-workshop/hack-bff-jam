import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'accountDS',
  connector: 'mssql',
  // url: 'mssql://hk_service:vc2D3UrWc9x@@ibm-hackathon-db-server.database.windows.net,1433/HRMockDatatabase',
  url: '',
  host: 'ibm-hackathon-db-server.database.windows.net',
  port: 1433,
  user: 'hk_service',
  password: 'vc2D3UrWc9x@',
  database: 'HRMockDatatabase'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AccountDsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'accountDS';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.accountDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
