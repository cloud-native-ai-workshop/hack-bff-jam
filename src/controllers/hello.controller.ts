import {inject} from '@loopback/core';
import {
    Request,
    RestBindings,
    get,
    response,
    ResponseObject,
    param,
  } from '@loopback/rest';

  export class HelloController {
    constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

    @get('/hello')
    greet(@param.query.string('name') name: string) {
        return `Hello ${name}`;
      }
  }