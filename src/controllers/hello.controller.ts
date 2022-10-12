import {inject} from '@loopback/core';
import {
    // Request,
    // RestBindings,
    get,
    // response,
    // ResponseObject,
    param,
  } from '@loopback/rest';
import { HelloService } from '../services';

  export class HelloController {
    constructor(
      // @inject(RestBindings.Http.REQUEST) private req: Request,
      @inject('services.HelloService')
      protected helloService: HelloService,
      // protected userRepository: UserRepository,
      ) {}

    @get('/hello')
    async greet(
      @param.query.string('name') name: string
      ): Promise<Object> {
        // const res = await this.helloService.getHello(name)
        // return {message: res}
        return {message: `Hello ${name}`};
      }

      @get('/hi')
      greetHi() {
        return {message: 'Hi'}
      }

      // @get('/test')
      // async testDB(): Promise<Object>{
      //   // const res = await this.userRepository.find({});
      //   // return res;
      // }
  }