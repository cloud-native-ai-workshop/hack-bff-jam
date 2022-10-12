import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";

const SERVICE_BASE_URL = process.env.API_HOST

const config = {
    name: 'hello',
    connector: 'rest',
    baseURL: SERVICE_BASE_URL,
    options: {
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        }
    },
    operations: [
        {
            template: {
                method: 'GET',
                url: `${SERVICE_BASE_URL}/hello`,
                query: {
                    name: '{name:string}'
                }
            },
            functions: {
                getHello: [
                    'name'
                ]
            }
        }
    ]
};

@lifeCycleObserver('datasource')
export class HelloDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'hello';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.hello', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}