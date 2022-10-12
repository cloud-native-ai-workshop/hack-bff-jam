import { inject, Provider } from "@loopback/core";
import { getService } from "@loopback/service-proxy";
import { HelloDataSource } from "../datasources";

export interface HelloService {
    getHello(name: string): Promise<Object>;
}

export class HelloServiceProvider implements Provider<HelloService> {
    constructor(
        @inject('datasources.hello')
        protected dataSource: HelloDataSource = new HelloDataSource(),
    ) {}

    value(): Promise<HelloService> {
        return getService(this.dataSource)
    }
}